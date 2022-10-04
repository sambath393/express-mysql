const Logs = require('../models/logs');
const QoutesDetail = require('../models/QoutesDetail');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.detail_qoute

async function getQoutesDetail(req, res) {
  try {
    let data = [];

    data = await QoutesDetail.getAll(db);

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

async function createQoutesDetail(req, res) {
  try {
    const data = req.body;
    const id = await QoutesDetail.create(db, data, 1);

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

async function updateQoutesDetail(req, res) {
  try {
    const { id } = req.query;
    const data = req.body;
    const resData = await QoutesDetail.updateById(db, id, data, 1);

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

async function deleteQoutesDetail(req, res) {
  try {
    const { id } = req.query;
    const resData = await QoutesDetail.deleteById(db, id, 1);

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
  getQoutesDetail,
  createQoutesDetail,
  updateQoutesDetail,
  deleteQoutesDetail,
};
