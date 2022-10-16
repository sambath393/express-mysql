const { tableList } = require('./tableDb');

class Users {
  static tablePath = tableList.users;

  static fill = (obj) => {
    return {
      uid: parseInt(obj.uid),
      user: String(obj.user),
      pass: String(obj.pass),
      token: String(obj.token),
      active: Boolean(obj.active),
      rnid: parseInt(obj.rnid),
      created_at: new Date(),
      updated_at: new Date(),
    };
  };

  static getAll = async (knex) => {
    const res = knex(this.tablePath)
      .join(tableList.role_names, `${this.tablePath}.rnid`, '=', `${tableList.role_names}.id`)
      .column(
        `${this.tablePath}.id`,
        'uid',
        'user',
        'pass',
        'token',
        'active',
        'rnid',
        { rn_name: 'role_names.name' },
        `${this.tablePath}.created_at`,
        `${this.tablePath}.updated_at`
      );
    return res.length > 1 ? res?.shift() : [];
  };

  static getByRoleNamesId = async (knex, rnid) => {
    return knex(this.tablePath)
      .where('rnid', rnid)
      .join(tableList.role_names, `${this.tablePath}.rnid`, '=', `${tableList.role_names}.id`)
      .column(
        `${this.tablePath}.id`,
        'uid',
        'user',
        'pass',
        'token',
        'active',
        'rnid',
        { rn_name: 'role_names.name' },
        `${this.tablePath}.created_at`,
        `${this.tablePath}.updated_at`
      );
  };

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() });
  };

  static updateById = async (knex, id, data) => {
    return knex(this.tablePath)
      .where('id', '=', id)
      .update({ ...data, updated_at: new Date() })
      .then((res) => {
        return res;
      });
  };
}

module.exports = Users;
