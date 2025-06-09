// File: src/database/query.js

// Import the specific builder classes
import SelectBuilder from './selectBuilder';
import InsertBuilder from './insertBuilder';
import UpdateBuilder from './updateBuilder';
import DeleteBuilder from './deleteBuilder';

/**
 * Entry point for building SQL queries.
 * This class provides static factory methods to get specific builder instances.
 */
class Query {
    /**
     * Starts building a SELECT query.
     * @param {string|string[]} [columns] - The column(s) to select. Defaults to all columns (*).
     * @returns {SelectBuilder} A new SelectBuilder instance.
     */
    static select(columns) {
        // Create a new SelectBuilder instance and pass the columns
        // Each builder type manages its own replacements and placeholder counter internally
        const builder = new SelectBuilder((value) => {
            // This lambda function is passed down to ClauseBuilder
            const placeholderName = `p${builder._placeholderCounter++}`; // Use builder's counter
            builder._replacements[placeholderName] = value;              // Populate builder's replacements
            return `:${placeholderName}`;
        });
        if (columns) {
            builder.select(columns); // Set columns if provided
        } else {
            // If columns is not provided, SelectBuilder constructor defaults to '*'
        }
        return builder;
    }

    /**
     * Starts building an INSERT query.
     * @param {string} tableName - The name of the table to insert into.
     * @param {object} data - An object representing the row data { col: value }. Must not be empty.
     * @returns {InsertBuilder} A new InsertBuilder instance.
     */
    static insert(tableName, data) {
        // Create a new InsertBuilder instance
        const builder = new InsertBuilder((value) => {
            const placeholderName = `p${builder._placeholderCounter++}`;
            builder._replacements[placeholderName] = value;
            return `:${placeholderName}`;
        });
        return builder.insert(tableName, data); // Set table and data immediately
    }

    /**
     * Starts building an UPDATE query.
     * @param {string} tableName - The name of the table to update.
     * @param {object} data - An object representing the data to set { col: newValue }. Must not be empty.
     * @returns {UpdateBuilder} A new UpdateBuilder instance.
     */
    static update(tableName, data) {
        const builder = new UpdateBuilder((value) => {
            const placeholderName = `p${builder._placeholderCounter++}`;
            builder._replacements[placeholderName] = value;
            return `:${placeholderName}`;
        });
        return builder.update(tableName, data); // Set table and data immediately
    }

    /**
     * Starts building a DELETE query.
     * @param {string} tableName - The name of the table to delete from.
     * @returns {DeleteBuilder} A new DeleteBuilder instance.
     */
    static delete(tableName) {
        const builder = new DeleteBuilder((value) => {
            const placeholderName = `p${builder._placeholderCounter++}`;
            builder._replacements[placeholderName] = value;
            return `:${placeholderName}`;
        });
        return builder.delete(tableName).build(); // Set table immediately
    }

    // Add other static factory methods if needed (e.g., for DDL like CREATE TABLE - though that's more complex)

    // Note: The 'build()' method now resides on the specific builder instances (SelectBuilder, etc.)
    // This Query class is just for initiating the correct builder.
}

// Export the Query class as the default entry point
export default Query;

/*
// If you prefer CommonJS module.exports:
// module.exports = Query;
*/