var express = require('express');
const { getLogs } = require('../controllers/logs');
var router = express.Router();

router.route('/').get(getLogs);

module.exports = router;
