const Logs = require('../models/logs');
const Qoutes = require('../models/qoutes');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.qoutes

async function getQoutes(req, res) {
  try {
    let data = [];

    data = await Qoutes.getAll(db);

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

async function createQoutes(req, res) {
  try {
    const data = req.body;
    const id = await Qoutes.create(db, data, 1);

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'create',
      message: `ID: ${id[0]} create success.`,
    });
    res.status(200).json({ message: 'Successful', data: { id } });
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

async function updateQoutes(req, res) {
  try {
    const { id } = req.query;
    const data = req.body;
    const resData = await Qoutes.updateById(db, id, data, 1);

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'update',
      message: `ID: ${id[0]} update success.`,
    });
    res.status(200).json({ message: 'Successful', data: { id: resData } });
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

async function deleteQoutes(req, res) {
  try {
    const { id } = req.query;
    const resData = await Qoutes.deleteById(db, id, 1);

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'delete',
      message: `ID: ${id[0]} delete success.`,
    });
    res.status(200).json({ message: 'Successful', data: { id: resData } });
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
  getQoutes,
  createQoutes,
  updateQoutes,
  deleteQoutes,
};
