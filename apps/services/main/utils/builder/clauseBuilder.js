import ClauseTypes from './clauseTypes'; // Import ClauseTypes

/**
 * Builds WHERE and HAVING clauses.
 * This builder relies on an external function to handle parameter replacements.
 */
class ClauseBuilder {
    /**
     * @param {function(any): string} addReplacement - A function from the main builder
     * that adds a value to the main replacements object and returns its placeholder string.
     */
    constructor(addReplacement) {
        if (typeof addReplacement !== 'function') {
            throw new Error('ClauseBuilder requires an addReplacement function.');
        }
        /** @private */
        this._addReplacement = addReplacement;

        /** @type {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} */
        this._whereConditions = [];
        /** @type {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} */
        this._havingConditions = [];
    }

    // --- Internal helper to add a condition to a conditions array ---
    /**
     * @param {Array<object>} conditionsArray - The array to add the condition to (_whereConditions or _havingConditions).
     * @param {{field?: string, operator: string, value?: any, type?: string, bool?: 'AND'|'OR'}} conditionDetails - An object containing the details of the condition.
     * @private
     */
    _addCondition(conditionsArray, conditionDetails) {
        // Determine the boolean operator prefix (AND/OR), skip for the first condition
        const effectiveBool = conditionsArray.length === 0 ? null : (conditionDetails.bool || ClauseTypes.AND); // Default to AND

        conditionsArray.push({
            field: conditionDetails.field,
            operator: conditionDetails.operator,
            value: conditionDetails.value,
            type: conditionDetails.type || 'simple', // Default type
            bool: effectiveBool
        });
    }

    /**
    * Internal helper: Builds the condition string (for WHERE or HAVING) from an array of condition objects.
    * @param {Array<object>} conditions - The array of condition objects.
    * @returns {string} The built SQL condition string.
    * @private
    */
    _buildConditionString(conditions) {
        const parts = [];
        for (const cond of conditions) {
            const boolOperator = cond.bool ? ` ${cond.bool} ` : '';
            let conditionString = '';

            switch (cond.type) {
                case 'simple':
                    const placeholder = this._addReplacement(cond.value);
                    conditionString = `${cond.field} ${cond.operator} ${placeholder}`;
                    break;
                case 'in':
                    const placeholdersIn = cond.value.map(val => this._addReplacement(val));
                    // Handle empty IN array: WHERE field IN () is invalid SQL, use 1=0 instead
                    if (placeholdersIn.length === 0) {
                        conditionString = '1=0';
                    } else {
                        conditionString = `${cond.field} ${cond.operator} (${placeholdersIn.join(', ')})`;
                    }
                    break;
                case 'between':
                    if (!Array.isArray(cond.value) || cond.value.length !== 2) {
                        throw new Error('Internal Error: Between condition missing values.');
                    }
                    const p1 = this._addReplacement(cond.value[0]);
                    const p2 = this._addReplacement(cond.value[1]);
                    conditionString = `${cond.field} ${cond.operator} ${p1} AND ${p2}`; // BETWEEN uses AND keyword directly
                    break;
                case 'null': // IS NULL or IS NOT NULL
                    conditionString = `${cond.field} ${cond.operator}`; // No value/placeholder needed
                    break;
                case 'exists':
                    if (typeof cond.value !== 'string' || cond.value.trim() === '') {
                        throw new Error('Internal Error: EXISTS condition requires a non-empty string subquery.');
                    }
                    conditionString = `${cond.operator} (${cond.value})`; // operator is 'EXISTS'
                    // Reminder: Does NOT handle replacements within the raw subquery SQL here
                    console.warn("ClauseBuilder does not handle replacements within the raw subquery SQL for EXISTS. Use with caution.");
                    break;
                default:
                    throw new Error(`Unsupported internal condition type: ${cond.type}`);
            }

            if (conditionString) {
                // Add the built condition string with its boolean operator prefix
                parts.push(`${boolOperator}${conditionString}`);
            }
        }
        // After building parts, ensure the first part doesn't have a leading boolean operator
        if (parts.length > 0) {
            parts[0] = parts[0].trimStart();
        }
        return parts.join('');
    }

    // --- Public Methods to add WHERE conditions ---

    /**
     * Adds a condition to the WHERE clause. This is the first condition or follows the last condition
     * with an implicit AND if no other boolean method (andWhere/orWhere) was used previously.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator (use ClauseTypes).
     * @param {*} value - The value for the comparison.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    where(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple' });
        return this;
    }
    /**
     * Adds a condition to the WHERE clause, preceded by AND.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator (use ClauseTypes).
     * @param {*} value - The value for the comparison.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    andWhere(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple', bool: ClauseTypes.AND });
        return this;
    }
    /**
     * Adds a condition to the WHERE clause, preceded by OR.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator (use ClauseTypes).
     * @param {*} value - The value for the comparison.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    orWhere(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple', bool: ClauseTypes.OR });
        return this;
    }

    /**
     * Adds a WHERE condition using the IN operator.
     * @param {string} field - The field name.
     * @param {Array<*>} values - An array of values for the IN clause. If the array is empty, a condition that always fails (e.g., '1=0') is generated.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     * @throws {Error} If values is not an array.
     */
    whereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('whereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IN, value: values, type: 'in' });
        return this;
    }
    /**
    * Adds a WHERE IN condition, preceded by AND.
    * @param {string} field - The field name.
    * @param {Array<*>} values - An array of values for the IN clause.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    * @throws {Error} If values is not an array.
    */
    andWhereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('andWhereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IN, value: values, type: 'in', bool: ClauseTypes.AND });
        return this;
    }
    /**
    * Adds a WHERE IN condition, preceded by OR.
    * @param {string} field - The field name.
    * @param {Array<*>} values - An array of values for the IN clause.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    * @throws {Error} If values is not an array.
    */
    orWhereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('orWhereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IN, value: values, type: 'in', bool: ClauseTypes.OR });
        return this;
    }


    /**
     * Adds a WHERE condition using the BETWEEN operator.
     * @param {string} field - The field name.
     * @param {*} val1 - The first value.
     * @param {*} val2 - The second value.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    whereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.BETWEEN, value: [val1, val2], type: 'between' });
        return this;
    }
    /**
    * Adds a WHERE BETWEEN condition, preceded by AND.
    * @param {string} field - The field name.
    * @param {*} val1 - The first value.
    * @param {*} val2 - The second value.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    andWhereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.BETWEEN, value: [val1, val2], type: 'between', bool: ClauseTypes.AND });
        return this;
    }
    /**
    * Adds a WHERE BETWEEN condition, preceded by OR.
    * @param {string} field - The field name.
    * @param {*} val1 - The first value.
    * @param {*} val2 - The second value.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    orWhereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.BETWEEN, value: [val1, val2], type: 'between', bool: ClauseTypes.OR });
        return this;
    }

    /**
     * Adds a WHERE condition using the IS NULL operator.
     * @param {string} field - The field name.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    whereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NULL, value: null, type: 'null' });
        return this;
    }
    /**
     * Adds a WHERE IS NULL condition, preceded by AND.
     * @param {string} field - The field name.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    andWhereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NULL, value: null, type: 'null', bool: ClauseTypes.AND });
        return this;
    }
    /**
    * Adds a WHERE IS NULL condition, preceded by OR.
    * @param {string} field - The field name.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    orWhereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NULL, value: null, type: 'null', bool: ClauseTypes.OR });
        return this;
    }

    /**
     * Adds a WHERE condition using the IS NOT NULL operator.
     * @param {string} field - The field name.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    whereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NOT_NULL, value: null, type: 'null' }); // Using 'null' type but different operator
        return this;
    }
    /**
    * Adds a WHERE IS NOT NULL condition, preceded by AND.
    * @param {string} field - The field name.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    andWhereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NOT_NULL, value: null, type: 'null', bool: ClauseTypes.AND });
        return this;
    }
    /**
    * Adds a WHERE IS NOT NULL condition, preceded by OR.
    * @param {string} field - The field name.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    orWhereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: ClauseTypes.IS_NOT_NULL, value: null, type: 'null', bool: ClauseTypes.OR });
        return this;
    }

    /**
     * Adds a WHERE condition using the EXISTS operator.
     * NOTE: This builder requires a raw SQL string for the subquery
     * and DOES NOT handle replacements within the subquery or merge them. Use with caution.
     * @param {string} rawSubquerySql - The raw SQL string for the subquery (e.g., 'SELECT 1 FROM another_table WHERE ...').
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     * @throws {Error} If rawSubquerySql is not a non-empty string.
     */
    whereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('whereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: ClauseTypes.EXISTS, value: rawSubquerySql, type: 'exists' });
        console.warn("ClauseBuilder does not handle replacements within the raw subquery SQL for whereExists. Use with caution.");
        return this;
    }
    /**
    * Adds a WHERE EXISTS condition, preceded by AND. Requires a raw SQL subquery string.
    * NOTE: Does NOT handle replacements within the subquery.
    * @param {string} rawSubquerySql - The raw SQL string for the subquery.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    * @throws {Error} If rawSubquerySql is not a non-empty string.
    */
    andWhereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('andWhereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: ClauseTypes.EXISTS, value: rawSubquerySql, type: 'exists', bool: ClauseTypes.AND });
        console.warn("ClauseBuilder does not handle replacements within the raw subquery SQL for andWhereExists. Use with caution.");
        return this;
    }
    /**
    * Adds a WHERE EXISTS condition, preceded by OR. Requires a raw SQL subquery string.
    * NOTE: Does NOT handle replacements within the subquery.
    * @param {string} rawSubquerySql - The raw SQL string for the subquery.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    * @throws {Error} If rawSubquerySql is not a non-empty string.
    */
    orWhereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('orWhereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: ClauseTypes.EXISTS, value: rawSubquerySql, type: 'exists', bool: ClauseTypes.OR });
        console.warn("ClauseBuilder does not handle replacements within the raw subquery SQL for orWhereExists. Use with caution.");
        return this;
    }


    // --- Public Methods to add HAVING conditions ---

    /**
     * Adds a condition to the HAVING clause. This is the first condition or follows the last condition
     * with an implicit AND if no other boolean method (andHaving/orHaving) was used previously.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator (use ClauseTypes).
     * @param {*} value - The value.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    having(field, operator, value) {
        this._addCondition(this._havingConditions, { field, operator, value, type: 'simple' });
        return this;
    }
    /**
    * Adds a HAVING condition, preceded by AND.
    * @param {string} field - The field name.
    * @param {string} operator - The comparison operator.
    * @param {*} value - The value.
    * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
    */
    andHaving(field, operator, value) {
        this._addCondition(this._havingConditions, { field, operator, value, type: 'simple', bool: ClauseTypes.AND });
        return this;
    }
    /**
     * Adds a HAVING condition, preceded by OR.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value.
     * @returns {ClauseBuilder} The current ClauseBuilder instance for chaining.
     */
    orHaving(field, operator, value) {
        this._addCondition(this._havingConditions, { field, operator, value, type: 'simple', bool: ClauseTypes.OR });
        return this;
    }
    // Add havingIn, havingBetween, havingNull/NotNull if needed, following where methods pattern


    // --- Build Methods for Clauses ---

    /**
     * Builds the WHERE clause string.
     * @returns {string} The built WHERE clause string, or an empty string if no WHERE conditions were added.
     */
    buildWhereString() {
        if (this._whereConditions.length === 0) {
            return '';
        }
        return `WHERE ${this._buildConditionString(this._whereConditions)}`;
    }

    /**
     * Builds the HAVING clause string.
     * @returns {string} The built HAVING clause string, or an empty string if no HAVING conditions were added.
     */
    buildHavingString() {
        if (this._havingConditions.length === 0) {
            return '';
        }
        return `HAVING ${this._buildConditionString(this._havingConditions)}`;
    }

    /**
     * Checks if any WHERE conditions have been added.
     * @returns {boolean} True if WHERE conditions exist, false otherwise.
     */
    hasWhereConditions() {
        return this._whereConditions.length > 0;
    }

    /**
    * Checks if any HAVING conditions have been added.
    * @returns {boolean} True if HAVING conditions exist, false otherwise.
    */
    hasHavingConditions() {
        return this._havingConditions.length > 0;
    }
}

export default ClauseBuilder;