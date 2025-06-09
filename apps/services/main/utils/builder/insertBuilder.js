// File: src/database/insertBuilder.js

/**
 * Builds INSERT queries.
 */
class InsertBuilder {
    /**
    * @param {function(any): string} addReplacement - A function from the main builder
    * that adds a value to the main replacements object and returns its placeholder string.
    */
    constructor(addReplacement) {
        if (typeof addReplacement !== 'function') {
            throw new Error('InsertBuilder requires an addReplacement function.');
        }
        /** @private */
        this._addReplacement = addReplacement;

        /** @type {string} */
        this._type = 'INSERT';
        /** @type {string|null} */
        this._tableName = null;
        /** @type {object|null} */
        this._insertData = null; // { col: value }
    }

    // --- INSERT Specific Methods ---

    /**
     * Sets the table to insert into and the data for the VALUES clause.
     * @param {string} tableName - The name of the table to insert into.
     * @param {object} data - An object representing the row data { col: value }. Must not be empty.
     * @returns {InsertBuilder} The current builder instance for chaining.
     * @throws {Error} If data is not a non-empty object.
     */
    insert(tableName, data) {
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            throw new Error('Insert data must be a non-empty object.');
        }
        this._tableName = tableName;
        this._insertData = data;
        return this;
    }

    /**
     * Alias for `.insert()` for clarity.
     * @param {string} tableName - The name of the table.
     * @param {object} data - The data to insert.
     * @returns {InsertBuilder} The current builder instance for chaining.
     */
    into(tableName, data) {
        return this.insert(tableName, data);
    }

    // --- Build Method ---

    /**
     * Builds the final SQL query string for the INSERT statement.
     * @returns {string} The built SQL query string.
     * @throws {Error} If table name or insert data is not specified.
     */
    build() {
        if (!this._tableName) throw new Error('Table name must be specified for INSERT query.');
        if (!this._insertData) throw new Error('Insert data must be specified for INSERT query.');

        const insertCols = Object.keys(this._insertData);
        const insertPlaceholders = insertCols.map(col => this._addReplacement(this._insertData[col]));

        let sql = `INSERT INTO ${this._tableName} (${insertCols.join(', ')}) VALUES (${insertPlaceholders.join(', ')})`;

        // Note: Returning the inserted ID is a feature of the DB client call, not the SQL string itself.

        // The main Query object (or the caller) will get the replacements
        // from the shared object populated by _addReplacement.

        return sql.trim();
    }
}

export default InsertBuilder;