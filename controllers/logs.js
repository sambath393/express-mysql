const Logs = require('../models/logs');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.logs;

async function getLogs(req, res) {
  try {
    let data = [];

    data = await Logs.getAll(db);

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'get',
      message: `Get data success.`,
    });
    res.status(200).json({ message: 'Successful', data });
  } catch (error) {
    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'error',
      message: error.message.toString(),
    });
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getLogs,
};
