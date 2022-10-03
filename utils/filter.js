const { tableList } = require('../models/tableDb');

const filterRolePath = (tablePath) =>
  Object.keys(tableList).findIndex((ele) => ele == tablePath) + 1;

module.exports = {
  filterRolePath,
};
