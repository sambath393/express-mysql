const Logs = require('../models/logs');
const Roles = require('../models/roles');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.roles;

async function getRoles(req, res) {
  try {
    const { rnid } = req.query;
    let data = [];

    if (rnid) {
      data = await Roles.getByRoleNamesId(db, rnid)
    } else {
      data = await Roles.getAll(db);
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

async function createRoles(req, res) {
  try {
    const data = req.body;
    const id = await Roles.create(db, data);

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

async function updateRoles(req, res) {
  try {
    const { id } = req.query;
    const data = req.body;
    const resData = await Roles.updateById(db, id, data);

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

async function deleteRoles(req, res) {
  try {
    const { id } = req.query;
    const resData = await Roles.deleteById(db, id);

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
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles,
};
