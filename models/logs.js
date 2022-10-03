const { tableList } = require('./tableDb');

class Logs {
  static tablePath = tableList.logs;

  static fill = (obj) => {
    return {
      created_by: parseInt(obj.created_by),
      rpid: parseInt(obj.rpid),
      action: String(obj.action),
      message: String(obj.message),
      created_at: new Date(),
    };
  };

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() });
  };
}

module.exports = Logs;
