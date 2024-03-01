const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Generates SQL query for partial update based on the provided data and mapping.
 *
 * @param {Object} dataToUpdate - The data to be updated.
 * @param {Object} jsToSql - The mapping of JavaScript object keys to SQL column names.
 * @returns {Object} - An object containing the set columns and corresponding values for the SQL query.
 * @throws {BadRequestError} - If no data is provided.
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
