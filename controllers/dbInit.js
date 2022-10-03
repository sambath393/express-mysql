const { GenerateDbTbl } = require('../models/tableDb');
const { db } = require('../services/config');

async function createTable(req, res) {
  try {
    await GenerateDbTbl.run(db);
    res.status(200).json({ message: 'Successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTable(req, res) {
  try {
    await GenerateDbTbl.deleteTbl(db);
    res.status(200).json({ message: 'Successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTable,
  deleteTable,
};
