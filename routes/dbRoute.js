var express = require('express');
const { createTable, deleteTable } = require('../controllers/dbInit');
var router = express.Router();

router.route('/').get(createTable).delete(deleteTable);

module.exports = router