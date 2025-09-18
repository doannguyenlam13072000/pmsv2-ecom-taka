// File: src/database/manualQueryBuilder.js

/**
 * A manual SQL Query Builder class using the Builder pattern.
 * This builder constructs SQL query strings and their corresponding replacements object
 * for use with database clients that support named parameters (like Sequelize raw queries).
 */
class QueryBuilder {
    constructor() {
        /** @type {string|null} */
        this._type = null; // 'SELECT', 'INSERT', 'UPDATE', 'DELETE'
        /** @type {string|null} */
        this._tableName = null;
        /** @type {string[]} */
        this._columns = []; // For SELECT queries
        /** @type {object|null} */
        this._insertData = null; // For INSERT queries: { col: value }
        /** @type {object|null} */
        this._updateData = null; // For UPDATE queries: { col: value }
        /** @type {Array<{type: string, table: string, on: string}>} */
        this._joins = []; // For SELECT queries: [{ type: 'INNER', table: '...', on: '...' }]
        /** @type {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} */
        this._whereConditions = []; // For WHERE clauses: [{ field, operator, value, type: 'simple'|'in'|'between'|'null'|'exists', bool: 'AND'|'OR' }]
        /** @type {string[]} */
        this._groupBy = []; // For GROUP BY clauses: ['col1', 'col2']
        /** @type {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} */
        this._havingConditions = []; // For HAVING clauses: Structure similar to whereConditions
        /** @type {Array<{field: string, direction: string}>} */
        this._orderBy = []; // For ORDER BY clauses: [{ field: '...', direction: 'ASC'|'DESC' }]
        /** @type {number|null} */
        this._limit = null; // For LIMIT clause
        /** @type {number|null} */
        this._offset = null; // For OFFSET clause

        /** @type {object} */
        this._replacements = {}; // Object to hold values for Parameterized Queries
        /** @type {number} */
        this._placeholderCounter = 0; // Counter to generate unique placeholder names
    }

    // --- Internal helper methods ---

    /**
     * Adds a value to the internal replacements object and generates a unique placeholder name.
     * @param {*} value - The value to parameterize.
     * @returns {string} The generated placeholder name (e.g., ":p0").
     * @private
     */
    _addReplacement(value) {
        // Create a unique placeholder name, e.g., p0, p1, p2...
        const placeholderName = `p${this._placeholderCounter++}`;
        this._replacements[placeholderName] = value;
        // Return the placeholder format expected by your database driver (e.g., :p0)
        return `:${placeholderName}`;
    }

    /**
     * Internal helper to add a condition to a conditions array (WHERE or HAVING).
     * Groups condition details into a single object parameter to reduce parameter count,
     * addressing potential 'max-params' ESLint warnings.
     * @param {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} conditionsArray - The array to add the condition to (_whereConditions or _havingConditions).
     * @param {{field?: string, operator: string, value?: any, type?: string, bool?: 'AND'|'OR'}} conditionDetails - An object containing the details of the condition.
     * @private
     */
    _addCondition(conditionsArray, conditionDetails) {
        // Determine the boolean operator prefix (AND/OR), skip for the first condition
        const effectiveBool = conditionsArray.length === 0 ? null : (conditionDetails.bool || 'AND'); // Default to AND if not specified

        conditionsArray.push({
            field: conditionDetails.field,
            operator: conditionDetails.operator,
            value: conditionDetails.value,
            type: conditionDetails.type || 'simple', // Default type to simple if not provided
            bool: effectiveBool
        });
    }

    /**
    * Internal helper: Builds the WHERE or HAVING string from a conditions array.
    * @param {Array<{field?: string, operator: string, value?: any, type: string, bool: string|null}>} conditions - The array of condition objects.
    * @returns {string} The built SQL condition string (e.g., "field = :p0 AND other_field IS NOT NULL").
    * @private
    */
    _buildConditionString(conditions) {
        const parts = [];
        for (const cond of conditions) {
            // Add the boolean operator prefix (AND/OR), skip for the first condition
            const boolOperator = cond.bool ? ` ${cond.bool} ` : '';
            let conditionString = '';

            switch (cond.type) {
                case 'simple':
                    const placeholder = this._addReplacement(cond.value);
                    conditionString = `${cond.field} ${cond.operator} ${placeholder}`;
                    break;
                case 'in':
                    // Empty IN array handled when adding the condition (_addCondition checks for empty values)
                    const placeholdersIn = cond.value.map(val => this._addReplacement(val));
                    // Handle edge case where IN array was empty, resulting in no placeholders
                    if (placeholdersIn.length === 0) {
                        conditionString = '1=0'; // Generate a condition that is always false
                    } else {
                        conditionString = `${cond.field} ${cond.operator} (${placeholdersIn.join(', ')})`;
                    }
                    break;
                case 'between':
                    if (!Array.isArray(cond.value) || cond.value.length !== 2) {
                        // This error should ideally be thrown when adding the condition
                        throw new Error('Internal Error: Between condition missing values.');
                    }
                    const p1 = this._addReplacement(cond.value[0]);
                    const p2 = this._addReplacement(cond.value[1]);
                    conditionString = `${cond.field} ${cond.operator} ${p1} AND ${p2}`; // BETWEEN uses AND keyword directly
                    break;
                case 'null': // IS NULL or IS NOT NULL
                    conditionString = `${cond.field} ${cond.operator}`; // No value/placeholder for IS NULL/IS NOT NULL
                    break;
                case 'exists':
                    if (typeof cond.value !== 'string' || cond.value.trim() === '') {
                        throw new Error('Internal Error: EXISTS condition requires a non-empty string subquery.');
                    }
                    conditionString = `${cond.operator} (${cond.value})`; // operator is 'EXISTS'
                    // Reminder: Does NOT handle replacements within the raw subquery SQL here
                    // Consider adding a way to pass and merge subquery replacements if needed for complex cases.
                    break;
                default:
                    throw new Error(`Unsupported internal condition type: ${cond.type}`);
            }

            // Only add to parts if a string was built
            if (conditionString) {
                // The effectiveBool logic in _addCondition already determines if boolOperator is null for the first item.
                // We just join the parts.
                parts.push(`${boolOperator}${conditionString}`);
            }
        }
        // After building parts, ensure the first part doesn't have a leading boolean operator
        // if it wasn't supposed to (this is handled by effectiveBool now, but defensive check is okay)
        if (parts.length > 0) {
            parts[0] = parts[0].trimStart();
        }
        return parts.join('');
    }


    // --- Methods to set the query type ---

    /**
     * Sets the query type to SELECT and specifies columns to retrieve.
     * @param {string|string[]} [columns=['*']] - The column(s) to select. Defaults to all columns (*).
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    select(columns = ['*']) {
        this._type = 'SELECT';
        // Ensure columns is an array
        this._columns = Array.isArray(columns) ? columns : [columns];
        return this; // Return instance to allow chaining
    }

    /**
     * Sets the query type to INSERT and specifies the table and data to insert.
     * @param {string} tableName - The name of the table to insert into.
     * @param {object} data - An object representing the row data { col: value }. Must not be empty.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If data is not a non-empty object.
     */
    insert(tableName, data) {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            throw new Error('Insert data must be a non-empty object.');
        }
        this._type = 'INSERT';
        this._tableName = tableName;
        this._insertData = data;
        return this;
    }

    /**
     * Sets the query type to UPDATE and specifies the table and data to update.
     * @param {string} tableName - The name of the table to update.
     * @param {object} data - An object representing the data to set { col: newValue }. Must not be empty.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If data is not a non-empty object.
     */
    update(tableName, data) {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            throw new Error('Update data must be a non-empty object.');
        }
        this._type = 'UPDATE';
        this._tableName = tableName;
        this._updateData = data;
        return this;
    }

    /**
     * Sets the query type to DELETE and specifies the table to delete from.
     * Use `.where()` to specify which rows to delete.
     * @param {string} tableName - The name of the table to delete from.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    delete(tableName) {
        this._type = 'DELETE';
        this._tableName = tableName;
        return this;
    }

    // --- Methods to add clauses ---

    /**
     * Specifies the primary table for the query (FROM clause for SELECT/DELETE, table for UPDATE).
     * @param {string} tableName - The name of the table.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    from(tableName) {
        this._tableName = tableName;
        return this;
    }

    /**
     * Alias for `.from()`, typically used with INSERT for clarity.
     * @param {string} tableName - The name of the table.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    into(tableName) {
        // Alias for from, used for INSERT for clarity
        return this.from(tableName);
    }

    /**
     * Adds a JOIN clause to the query.
     * @param {string} type - The type of JOIN ('INNER', 'LEFT', 'RIGHT', 'FULL'). Case-insensitive.
     * @param {string} table - The table to join with.
     * @param {string} onCondition - The ON clause condition (e.g., 'table1.col = table2.col').
     * NOTE: Be cautious if `onCondition` contains dynamic data; this builder assumes it's a fixed structure.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If onCondition is not a string.
     */
    join(type, table, onCondition) {
        if (typeof onCondition !== 'string') throw new Error('Join onCondition must be a string.');
        const validJoinTypes = ['INNER', 'LEFT', 'RIGHT', 'FULL'];
        const upperType = type.toUpperCase();
        if (!validJoinTypes.includes(upperType)) {
            console.warn(`Unsupported join type: ${type}. Using INNER JOIN.`);
            type = 'INNER';
        } else {
            type = upperType;
        }
        this._joins.push({ type: `${type} JOIN`, table, on: onCondition });
        return this;
    }
    /** Alias for `.join('INNER', ...)` */
    innerJoin(table, onCondition) { return this.join('INNER', table, onCondition); }
    /** Alias for `.join('LEFT', ...)` */
    leftJoin(table, onCondition) { return this.join('LEFT', table, onCondition); }
    /** Alias for `.join('RIGHT', ...)` */
    rightJoin(table, onCondition) { return this.join('RIGHT', table, onCondition); }
    /** Alias for `.join('FULL', ...)` */
    fullJoin(table, onCondition) { return this.join('FULL', table, onCondition); }


    // --- Methods to add WHERE conditions (UPDATED CALLS TO _addCondition) ---

    /**
     * Adds a condition to the WHERE clause. This is the first condition or follows the last condition
     * with an implicit AND if no other boolean method (andWhere/orWhere) was used previously.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator (e.g., '=', '>', '<', 'LIKE').
     * @param {*} value - The value for the comparison.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    where(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple' });
        return this;
    }
    /**
     * Adds a condition to the WHERE clause, preceded by AND.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value for the comparison.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    andWhere(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple', bool: 'AND' });
        return this;
    }
    /**
     * Adds a condition to the WHERE clause, preceded by OR.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value for the comparison.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    orWhere(field, operator, value) {
        this._addCondition(this._whereConditions, { field, operator, value, type: 'simple', bool: 'OR' });
        return this;
    }

    /**
     * Adds a WHERE condition using the IN operator.
     * @param {string} field - The field name.
     * @param {Array<*>} values - An array of values for the IN clause. If the array is empty, a condition that always fails (e.g., '1=0') is generated.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    whereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('whereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: 'IN', value: values, type: 'in' });
        return this;
    }
    /**
    * Adds a WHERE IN condition, preceded by AND.
    * @param {string} field - The field name.
    * @param {Array<*>} values - An array of values for the IN clause.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    andWhereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('andWhereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: 'IN', value: values, type: 'in', bool: 'AND' });
        return this;
    }
    /**
    * Adds a WHERE IN condition, preceded by OR.
    * @param {string} field - The field name.
    * @param {Array<*>} values - An array of values for the IN clause.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    orWhereIn(field, values) {
        if (!Array.isArray(values)) throw new Error('orWhereIn requires an array of values.');
        this._addCondition(this._whereConditions, { field, operator: 'IN', value: values, type: 'in', bool: 'OR' });
        return this;
    }

    /**
     * Adds a WHERE condition using the BETWEEN operator.
     * @param {string} field - The field name.
     * @param {*} val1 - The first value.
     * @param {*} val2 - The second value.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    whereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: 'BETWEEN', value: [val1, val2], type: 'between' });
        return this;
    }
    /**
    * Adds a WHERE BETWEEN condition, preceded by AND.
    * @param {string} field - The field name.
    * @param {*} val1 - The first value.
    * @param {*} val2 - The second value.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    andWhereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: 'BETWEEN', value: [val1, val2], type: 'between', bool: 'AND' });
        return this;
    }
    /**
    * Adds a WHERE BETWEEN condition, preceded by OR.
    * @param {string} field - The field name.
    * @param {*} val1 - The first value.
    * @param {*} val2 - The second value.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    orWhereBetween(field, val1, val2) {
        this._addCondition(this._whereConditions, { field, operator: 'BETWEEN', value: [val1, val2], type: 'between', bool: 'OR' });
        return this;
    }

    /**
     * Adds a WHERE condition using the IS NULL operator.
     * @param {string} field - The field name.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    whereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NULL', value: null, type: 'null' });
        return this;
    }
    /**
     * Adds a WHERE IS NULL condition, preceded by AND.
     * @param {string} field - The field name.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    andWhereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NULL', value: null, type: 'null', bool: 'AND' });
        return this;
    }
    /**
    * Adds a WHERE IS NULL condition, preceded by OR.
    * @param {string} field - The field name.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    orWhereNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NULL', value: null, type: 'null', bool: 'OR' });
        return this;
    }

    /**
     * Adds a WHERE condition using the IS NOT NULL operator.
     * @param {string} field - The field name.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    whereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NOT NULL', value: null, type: 'null' }); // Using 'null' type but different operator
        return this;
    }
    /**
    * Adds a WHERE IS NOT NULL condition, preceded by AND.
    * @param {string} field - The field name.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    andWhereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NOT NULL', value: null, type: 'null', bool: 'AND' });
        return this;
    }
    /**
    * Adds a WHERE IS NOT NULL condition, preceded by OR.
    * @param {string} field - The field name.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    orWhereNotNull(field) {
        this._addCondition(this._whereConditions, { field, operator: 'IS NOT NULL', value: null, type: 'null', bool: 'OR' });
        return this;
    }

    /**
     * Adds a WHERE condition using the EXISTS operator.
     * NOTE: This basic manual builder requires a raw SQL string for the subquery
     * and DOES NOT handle replacements within the subquery or merge them. Use with caution.
     * @param {string} rawSubquerySql - The raw SQL string for the subquery (e.g., 'SELECT 1 FROM another_table WHERE ...').
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If rawSubquerySql is not a non-empty string.
     */
    whereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('whereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: 'EXISTS', value: rawSubquerySql, type: 'exists' });
        console.warn("ManualQueryBuilder does not handle replacements within the raw subquery SQL for whereExists. Use with caution.");
        return this;
    }
    /**
    * Adds a WHERE EXISTS condition, preceded by AND. Requires a raw SQL subquery string.
    * NOTE: Does NOT handle replacements within the subquery.
    * @param {string} rawSubquerySql - The raw SQL string for the subquery.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    * @throws {Error} If rawSubquerySql is not a non-empty string.
    */
    andWhereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('andWhereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: 'EXISTS', value: rawSubquerySql, type: 'exists', bool: 'AND' });
        console.warn("ManualQueryBuilder does not handle replacements within the raw subquery SQL for andWhereExists. Use with caution.");
        return this;
    }
    /**
    * Adds a WHERE EXISTS condition, preceded by OR. Requires a raw SQL subquery string.
    * NOTE: Does NOT handle replacements within the subquery.
    * @param {string} rawSubquerySql - The raw SQL string for the subquery.
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    * @throws {Error} If rawSubquerySql is not a non-empty string.
    */
    orWhereExists(rawSubquerySql) {
        if (typeof rawSubquerySql !== 'string' || rawSubquerySql.trim() === '') {
            throw new Error('orWhereExists requires a non-empty string subquery.');
        }
        this._addCondition(this._whereConditions, { operator: 'EXISTS', value: rawSubquerySql, type: 'exists', bool: 'OR' });
        console.warn("ManualQueryBuilder does not handle replacements within the raw subquery SQL for orWhereExists. Use with caution.");
        return this;
    }


    // --- Method to add GROUP BY ---

    /**
     * Adds columns for the GROUP BY clause.
     * @param {string|string[]} columns - The column(s) to group by.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    groupBy(columns) {
        this._groupBy = Array.isArray(columns) ? columns : [columns];
        return this;
    }

    // --- Methods to add HAVING conditions (similar to WHERE but applies to groups) ---

    /**
     * Adds a condition to the HAVING clause. This is the first condition or follows the last condition
     * with an implicit AND if no other boolean method (andHaving/orHaving) was used previously.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
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
    * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
    */
    andHaving(field, operator, value) {
        this._addCondition(this._havingConditions, { field, operator, value, type: 'simple', bool: 'AND' });
        return this;
    }
    /**
     * Adds a HAVING condition, preceded by OR.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    orHaving(field, operator, value) {
        this._addCondition(this._havingConditions, { field, operator, value, type: 'simple', bool: 'OR' });
        return this;
    }
    // Similarly, you could add havingIn, havingBetween, havingNull/NotNull if needed


    // --- Method to add ORDER BY ---

    /**
     * Adds an ORDER BY clause.
     * @param {string} field - The field to order by.
     * @param {'ASC'|'DESC'} [direction='ASC'] - The ordering direction ('ASC' or 'DESC'). Case-insensitive.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     */
    orderBy(field, direction = 'ASC') {
        const upperDirection = direction.toUpperCase();
        if (upperDirection !== 'ASC' && upperDirection !== 'DESC') {
            console.warn(`Unsupported order direction: ${direction}. Using ASC.`);
            direction = 'ASC';
        } else {
            direction = upperDirection;
        }
        this._orderBy.push({ field, direction });
        return this;
    }

    // --- Methods to add LIMIT and OFFSET (Pagination) ---

    /**
     * Sets the LIMIT for the query results. Useful for pagination or getting top N results.
     * The value is parameterized for safety.
     * @param {number} value - The maximum number of rows to return. Must be a non-negative number.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If value is not a non-negative number.
     */
    limit(value) {
        if (typeof value !== 'number' || value < 0) throw new Error('Limit value must be a non-negative number.');
        this._limit = value;
        return this;
    }

    /**
     * Sets the OFFSET for the query results. Used with LIMIT for pagination.
     * The value is parameterized for safety.
     * @param {number} value - The number of rows to skip from the beginning. Must be a non-negative number.
     * @returns {QueryBuilder} The current QueryBuilder instance for chaining.
     * @throws {Error} If value is not a non-negative number.
     */
    offset(value) {
        if (typeof value !== 'number' || value < 0) throw Error('Offset value must be a non-negative number.');
        this._offset = value;
        return this;
    }

    // --- Final Method to Build and return the result ---

    /**
     * Builds the final SQL query string and the replacements object based on the configured state.
     * @returns {{query: string, replacements: object}} An object containing the SQL query string and the replacements object.
     * @throws {Error} If the query type or table name (for applicable queries) is not specified.
     */
    build() {
        if (!this._type) {
            throw new Error('Query type (SELECT, INSERT, UPDATE, DELETE) must be specified using select(), insert(), update(), or delete().');
        }
        if (!this._tableName && this._type !== 'SELECT') {
            throw new Error(`Table name must be specified for ${this._type} query using from() or into().`);
        }

        let sql = '';
        // Reset replacements and counter for this build call so results are independent
        this._replacements = {};
        this._placeholderCounter = 0;

        switch (this._type) {
            case 'SELECT':
                sql += `SELECT ${this._columns.join(', ')}`;
                if (this._tableName) {
                    sql += ` FROM ${this._tableName}`;
                }
                if (this._joins.length > 0) {
                    sql += ' ' + this._joins.map(join => {
                        // Simple handling for onCondition as a string. Needs improvement for safety/flexibility if 'on' has dynamic parts.
                        return `${join.type} ${join.table} ON ${join.on}`;
                    }).join(' ');
                }
                if (this._whereConditions.length > 0) {
                    sql += ` WHERE ${this._buildConditionString(this._whereConditions)}`;
                }
                if (this._groupBy.length > 0) {
                    sql += ` GROUP BY ${this._groupBy.join(', ')}`;
                }
                if (this._havingConditions.length > 0) {
                    sql += ` HAVING ${this._buildConditionString(this._havingConditions)}`;
                }
                if (this._orderBy.length > 0) {
                    sql += ` ORDER BY ${this._orderBy.map(order => `${order.field} ${order.direction}`).join(', ')}`;
                }
                if (this._limit !== null) {
                    // Limit value can sometimes be non-parameterized, but using replacement is safer if value is not hardcoded
                    const limitPlaceholder = this._addReplacement(this._limit);
                    sql += ` LIMIT ${limitPlaceholder}`;
                }
                if (this._offset !== null) {
                    // Offset value can sometimes be non-parameterized, but using replacement is safer if value is not hardcoded
                    const offsetPlaceholder = this._addReplacement(this._offset);
                    sql += ` OFFSET ${offsetPlaceholder}`;
                }
                break;

            case 'INSERT':
                if (!this._insertData || typeof this._insertData !== 'object' || Object.keys(this._insertData).length === 0) {
                    throw new Error('Insert data must be a non-empty object.'); // Should be caught earlier
                }
                const insertCols = Object.keys(this._insertData);
                const insertPlaceholders = insertCols.map(col => this._addReplacement(this._insertData[col]));
                sql += `INSERT INTO ${this._tableName} (${insertCols.join(', ')}) VALUES (${insertPlaceholders.join(', ')})`;
                // Note: This builder doesn't handle returning the inserted ID directly; that's a feature of the DB client call.
                break;

            case 'UPDATE':
                if (!this._updateData || typeof this._updateData !== 'object' || Object.keys(this._updateData).length === 0) {
                    throw new Error('Update data must be a non-empty object.'); // Should be caught earlier
                }

                const setClauses = Object.keys(this._updateData).map(col => {
                    const placeholder = this._addReplacement(this._updateData[col]);
                    return `${col} = ${placeholder}`;
                });
                sql += `UPDATE ${this._tableName} SET ${setClauses.join(', ')}`;
                if (this._whereConditions.length > 0) {
                    sql += ` WHERE ${this._buildConditionString(this._whereConditions)}`;
                } else {
                    // WARNING: UPDATE without WHERE is dangerous! This will update ALL rows.
                    console.warn(`Building an UPDATE query without a WHERE clause for table ${this._tableName}. This will update all rows.`);
                }
                break;

            case 'DELETE':
                sql += `DELETE FROM ${this._tableName}`;
                if (this._whereConditions.length > 0) {
                    sql += ` WHERE ${this._buildConditionString(this._whereConditions)}`;
                } else {
                    // WARNING: DELETE without WHERE is dangerous! This will delete ALL rows.
                    console.warn(`Building a DELETE query without a WHERE clause for table ${this._tableName}. This will delete all rows.`);
                }
                break;

            default:
                throw new Error(`Unsupported query type: ${this._type}`); // Should be caught earlier
        }

        // Return the trimmed SQL string and the replacements object
        return { query: sql.trim(), replacements: this._replacements };
    }

}

// --- Export the QueryBuilder class ---

// Exporting the class using ESM default export
export default QueryBuilder;