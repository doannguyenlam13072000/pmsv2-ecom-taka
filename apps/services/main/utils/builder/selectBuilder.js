import ClauseBuilder from './clauseBuilder'; // Import ClauseBuilder

/**
 * Builds SELECT queries.
 */
class SelectBuilder {
    /**
     * @param {function(any): string} addReplacement - A function from the main builder
     * that adds a value to the main replacements object and returns its placeholder string.
     */
    constructor(addReplacement) {
        if (typeof addReplacement !== 'function') {
            throw new Error('SelectBuilder requires an addReplacement function.');
        }
        /** @private */
        this._addReplacement = addReplacement;

        /** @type {string} */
        this._type = 'SELECT';
        /** @type {string|null} */
        this._tableName = null;
        /** @type {string[]} */
        this._columns = ['*'];
        /** @type {Array<{type: string, table: string, on: string}>} */
        this._joins = [];
        /** @type {string[]} */
        this._groupBy = [];
        /** @type {Array<{field: string, direction: string}>} */
        this._orderBy = [];
        /** @type {number|null} */
        this._limit = null;
        /** @type {number|null} */
        this._offset = null;

        /** @private */
        this._clauseBuilder = new ClauseBuilder(addReplacement); // Contains WHERE and HAVING builder
    }

    // --- Delegation to ClauseBuilder ---
    where(field, operator, value) {
        this._clauseBuilder.where(field, operator, value);
        return this;
    }
    andWhere(field, operator, value) {
        this._clauseBuilder.andWhere(field, operator, value);
        return this;
    }
    orWhere(field, operator, value) {
        this._clauseBuilder.orWhere(field, operator, value);
        return this;
    }
    whereIn(field, values) {
        this._clauseBuilder.whereIn(field, values);
        return this;
    }
    andWhereIn(field, values) {
        this._clauseBuilder.andWhereIn(field, values);
        return this;
    }
    orWhereIn(field, values) {
        this._clauseBuilder.orWhereIn(field, values);
        return this;
    }
    whereBetween(field, val1, val2) {
        this._clauseBuilder.whereBetween(field, val1, val2);
        return this;
    }
    andWhereBetween(field, val1, val2) {
        this._clauseBuilder.andWhereBetween(field, val1, val2);
        return this;
    }
    orWhereBetween(field, val1, val2) {
        this._clauseBuilder.orWhereBetween(field, val1, val2);
        return this;
    }
    whereNull(field) {
        this._clauseBuilder.whereNull(field);
        return this;
    }
    andWhereNull(field) {
        this._clauseBuilder.andWhereNull(field);
        return this;
    }
    orWhereNull(field) {
        this._clauseBuilder.orWhereNull(field);
        return this;
    }
    whereNotNull(field) {
        this._clauseBuilder.whereNotNull(field);
        return this;
    }
    andWhereNotNull(field) {
        this._clauseBuilder.andWhereNotNull(field);
        return this;
    }
    orWhereNotNull(field) {
        this._clauseBuilder.orNotNull(field);
        return this;
    } // Fix: Should be orWhereNotNull
    whereExists(rawSubquerySql) {
        this._clauseBuilder.whereExists(rawSubquerySql);
        return this;
    }
    andWhereExists(rawSubquerySql) {
        this._clauseBuilder.andWhereExists(rawSubquerySql);
        return this;
    }
    orWhereExists(rawSubquerySql) {
        this._clauseBuilder.orWhereExists(rawSubquerySql);
        return this;
    }

    groupBy(columns) {
        this._groupBy = Array.isArray(columns) ? columns : [columns];
        return this;
    } // GroupBy is simple, can keep here

    having(field, operator, value) {
        this._clauseBuilder.having(field, operator, value);
        return this;
    }
    andHaving(field, operator, value) {
        this._clauseBuilder.andHaving(field, operator, value);
        return this;
    }
    orHaving(field, operator, value) {
        this._clauseBuilder.orHaving(field, operator, value);
        return this;
    }

    orderBy(field, direction = 'ASC') { // OrderBy is simple, can keep here
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
    // --- End Delegation ---


    // --- SELECT Specific Methods ---

    /**
     * Specifies the columns to retrieve in the SELECT query.
     * @param {string|string[]} columns - The column(s) to select.
     * @returns {SelectBuilder} The current builder instance for chaining.
     */
    select(columns) {
        this._columns = Array.isArray(columns) ? columns : [columns];
        return this;
    }

    /**
     * Specifies the primary table for the FROM clause.
     * @param {string} tableName - The name of the table.
     * @returns {SelectBuilder} The current builder instance for chaining.
     */
    from(tableName) {
        this._tableName = tableName;
        return this;
    }

    /**
    * Adds a JOIN clause to the query.
    * @param {string} type - The type of JOIN ('INNER', 'LEFT', 'RIGHT', 'FULL'). Case-insensitive.
    * @param {string} table - The table to join with.
    * @param {string} onCondition - The ON clause condition (e.g., 'table1.col = table2.col').
    * NOTE: Be cautious if `onCondition` contains dynamic data; this builder assumes it's a fixed structure.
    * @returns {SelectBuilder} The current builder instance for chaining.
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


    /**
     * Sets the LIMIT for the query results. Useful for pagination or getting top N results.
     * The value is parameterized for safety.
     * @param {number} value - The maximum number of rows to return. Must be a non-negative number.
     * @returns {SelectBuilder} The current builder instance for chaining.
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
     * @returns {SelectBuilder} The current builder instance for chaining.
     * @throws {Error} If value is not a non-negative number.
     */
    offset(value) {
        if (typeof value !== 'number' || value < 0) throw Error('Offset value must be a non-negative number.');
        this._offset = value;
        return this;
    }

    // --- Build Method ---

    /**
     * Builds the final SQL query string for the SELECT statement.
     * @returns {string} The built SQL query string.
     * @throws {Error} If the table name is not specified unless JOINs are used.
     */
    build() {
        if (!this._tableName && this._joins.length === 0) {
            // Allow SELECT without FROM/JOIN for cases like SELECT NOW()
            if (this._columns.length === 0 || (this._columns.length === 1 && this._columns[0] === '*')) {
                // If no columns or only '*', and no FROM/JOIN, it's likely an error
                throw new Error('Table name or JOIN must be specified for SELECT query unless selecting literals/functions.');
            }
        }

        let sql = `SELECT ${this._columns.join(', ')}`;

        if (this._tableName) {
            sql += ` FROM ${this._tableName}`;
        }

        if (this._joins.length > 0) {
            sql += ' ' + this._joins.map(join => {
                return `${join.type} ${join.table} ON ${join.on}`;
            }).join(' ');
        }

        // Build WHERE clause using ClauseBuilder
        sql += ` ${this._clauseBuilder.buildWhereString()}`;

        if (this._groupBy.length > 0) {
            sql += ` GROUP BY ${this._groupBy.join(', ')}`;
        }

        // Build HAVING clause using ClauseBuilder
        sql += ` ${this._clauseBuilder.buildHavingString()}`;

        if (this._orderBy.length > 0) {
            sql += ` ORDER BY ${this._orderBy.map(order => `${order.field} ${order.direction}`).join(', ')}`;
        }

        // Add LIMIT and OFFSET (parameterized by main builder's _addReplacement)
        if (this._limit !== null) {
            sql += ` LIMIT ${this._addReplacement(this._limit)}`;
        }
        if (this._offset !== null) {
            sql += ` OFFSET ${this._addReplacement(this._offset)}`;
        }

        // The main Query object (or the caller) will get the replacements
        // from the shared object populated by _addReplacement.

        return { sql: sql.trim(), replacements: this._addReplacement };
    }
}

export default SelectBuilder;