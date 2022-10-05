var express = require('express');
const { createRoleName, updateRoleName, deleteRoleName, getRoleName } = require('../../controllers/roleName');
const { createRoles, updateRoles, deleteRoles, getRoles } = require('../../controllers/roles');
var router = express.Router();

router.route('/').get(getRoles).post(createRoles).put(updateRoles).delete(deleteRoles);
router.route('/name').get(getRoleName).post(createRoleName).put(updateRoleName).delete(deleteRoleName);

module.exports = router