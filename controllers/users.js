const Logs = require('../models/logs');
const Users = require('../models/users');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.users;

async function getUsers(req, res) {
  try {
    const { rnid } = req.query;
    let data = [];

    if (rnid) {
      data = await Users.getByRoleNamesId(db, rnid);
    } else {
      data = await Users.getAll(db);
    }

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

async function createUsers(req, res) {
  try {
    const data = req.body;
    const id = await Users.create(db, data);

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

async function updateUsers(req, res) {
  try {
    const { id } = req.query;
    const { data } = req.body;
    const resData = await Users.updateById(db, id, JSON.parse(data));

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'update',
      message: `ID: update success.`,
    });
    res.status(200).json({
      message: 'Successful',
      data: { id: resData },
    });
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
  getUsers,
  createUsers,
  updateUsers,
};
