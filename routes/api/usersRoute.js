var express = require('express');
const { createUsers, updateUsers, getUsers } = require('../../controllers/users');
var router = express.Router();

router.route('/').get(getUsers).post(createUsers).put(updateUsers);

module.exports = router