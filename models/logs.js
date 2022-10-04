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

  static getAll = async (knex) => {
    return knex(this.tablePath)
      .join(tableList.role_paths, `${this.tablePath}.rpid`, '=', `${tableList.role_paths}.id`)
      .join(tableList.users, `${this.tablePath}.created_by`, '=', `${tableList.users}.id`)
      .column(
        `${this.tablePath}.id`,
        { uid: 'created_by' },
        { username: 'users.user' },
        'rpid',
        { rp_name: 'role_paths.name' },
        'action',
        'message',
        `${this.tablePath}.created_at`,
        `${this.tablePath}.updated_at`,
      );
  };

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() });
  };
}

module.exports = Logs;
