/**
 * Defines standard SQL comparison and logical operators for use in query builders.
 */
const ClauseTypes = {
    EQUALS: '=',
    NOT_EQUALS: '!=',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    GREATER_THAN_OR_EQUAL: '>=', // Added for completeness
    LESS_THAN_OR_EQUAL: '<=',   // Added for completeness
    LIKE: 'LIKE',
    IN: 'IN',
    EXISTS: 'EXISTS',
    BETWEEN: 'BETWEEN',
    IS_NULL: 'IS NULL',
    IS_NOT_NULL: 'IS NOT NULL',
    AND: 'AND', // Added boolean operators
    OR: 'OR',   // Added boolean operators
};

// Using CommonJS module.exports as requested for this file
module.exports = ClauseTypes;