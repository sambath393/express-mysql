const { default: knex } = require('knex');
const { CONFIG } = require('../utils/dev');

const db = knex(CONFIG());

module.exports = {
    db
}