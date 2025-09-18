// File: src/database/updateBuilder.js

import ClauseBuilder from './clauseBuilder'; // Import ClauseBuilder

/**
 * Builds UPDATE queries.
 */
class UpdateBuilder {
    /**
    * @param {function(any): string} addReplacement - A function from the main builder
    * that adds a value to the main replacements object and returns its placeholder string.
    */
    constructor(addReplacement) {
        if (typeof addReplacement !== 'function') {
            throw new Error('UpdateBuilder requires an addReplacement function.');
        }
        /** @private */
        this._addReplacement = addReplacement;

        /** @type {string} */
        this._type = 'UPDATE';
        /** @type {string|null} */
        this._tableName = null;
        /** @type {object|null} */
        this._updateData = null; // { col: newValue }

        /** @private */
        this._clauseBuilder = new ClauseBuilder(addReplacement); // Contains WHERE builder
    }

    // --- Delegation to ClauseBuilder (only WHERE clauses for UPDATE) ---
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
        this._clauseBuilder.orWhereNotNull(field);
        return this;
    }
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
    // --- End Delegation ---

    // --- UPDATE Specific Methods ---

    /**
     * Sets the table to update and the data for the SET clause.
     * @param {string} tableName - The name of the table to update.
     * @param {object} data - An object representing the data to set { col: newValue }. Must not be empty.
     * @returns {UpdateBuilder} The current builder instance for chaining.
     * @throws {Error} If data is not a non-empty object.
     */
    update(tableName, data) {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            throw new Error('Update data must be a non-empty object.');
        }
        this._tableName = tableName;
        this._updateData = data;
        return this;
    }

    /**
     * Builds the final SQL query string for the UPDATE statement.
     * @returns {string} The built SQL query string.
     * @throws {Error} If table name or update data is not specified.
     */
    build() {
        if (!this._tableName) throw new Error('Table name must be specified for UPDATE query.');
        if (!this._updateData) throw new Error('Update data must be specified for UPDATE query.');

        const setClauses = Object.keys(this._updateData).map(col => {
            const placeholder = this._addReplacement(this._updateData[col]);
            return `${col} = ${placeholder}`;
        });
        let sql = `UPDATE ${this._tableName} SET ${setClauses.join(', ')}`;

        // Build WHERE clause using ClauseBuilder
        sql += ` ${this._clauseBuilder.buildWhereString()}`;

        if (!this._clauseBuilder.hasWhereConditions()) {
            // WARNING: UPDATE without WHERE is dangerous!
            console.warn(`Building an UPDATE query without a WHERE clause for table ${this._tableName}. This will update all rows.`);
        }

        // The main Query object (or the caller) will get the replacements
        // from the shared object populated by _addReplacement.

        return sql.trim();
    }
}

export default UpdateBuilder;