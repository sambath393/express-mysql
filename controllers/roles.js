const Logs = require('../models/logs');
const Roles = require('../models/roles');
const { tableList } = require('../models/tableDb');
const { db } = require('../services/config');
const { filterRolePath } = require('../utils/filter');

const tablePath = tableList.roles;

async function getRoles(req, res) {
  try {
    const { rnid, paginate } = req.query;
    let data = [];

    if (rnid) {
      data = await Roles.getByRoleNamesId(db, parseInt(rnid, 10));
    } else if (paginate) {
      data = await Roles.getAllByPaginate(db, JSON.parse(paginate));
    } else {
      data = await Roles.getAll(db);
    }

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'get',
      message: `Get data success.`,
    });
    res.status(200).json({ message: 'Successful', ...data });
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
    const { data } = req.body;
    // const id = await Roles.create(db, data);

    console.log(JSON.parse(data));

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'create',
      message: ` create success.`,
    });
    res.status(200).json({ message: 'Successful' });
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
    // const { id } = req.query;
    const data = req.body;
    // const resData = await Roles.updateById(db, id, data);

    const rp_data = JSON.parse(data.rp_data);

    rp_data.map((load) => {
      const id = load.id;
      delete load.id;
      delete load.rn_name;
      delete load.rp_name;
      return Roles.updateById(db, id, load);
    });

    await Logs.create(db, {
      created_by: 1,
      rpid: filterRolePath(tablePath),
      action: 'update',
      message: `Role path update success.`,
    });
    res.status(200).json({ message: 'successful' });
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
