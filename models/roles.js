const { tableList } = require('./tableDb');

class Roles {
  static tablePath = tableList.roles;

  static fill = (obj) => {
    return {
      rpid: parseInt(obj.rpid), // role path id
      rnid: parseInt(obj.rnid),
      create: Boolean(obj.create),
      update: Boolean(obj.update),
      delete: Boolean(obj.delete),
      created_at: new Date(),
      updated_at: new Date(),
    };
  };

  static getAll = async (knex) => {
    return knex(this.tablePath)
      .join(tableList.role_paths, `${this.tablePath}.rpid`, '=', `${tableList.role_paths}.id`)
      .join(tableList.role_names, `${this.tablePath}.rnid`, '=', `${tableList.role_names}.id`)
      .select('*')
      .column({ rp_name: 'role_paths.name' }, { rn_name: 'role_names.name' });
  };

  static getByRoleNamesId = async (knex, rnid) => {
    return knex(this.tablePath)
      .where('rnid', rnid)
      .join(tableList.role_paths, `${this.tablePath}.rpid`, '=', `${tableList.role_paths}.id`)
      .join(tableList.role_names, `${this.tablePath}.rnid`, '=', `${tableList.role_names}.id`)
      .column(
        `${this.tablePath}.id`,
        'create',
        'update',
        'delete',
        'rpid',
        'rnid',
        { rp_name: 'role_paths.name' },
        { rn_name: 'role_names.name' }
      );
  };

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() });
  };

  static updateById = async (knex, id, data) => {
    return knex(this.tablePath)
      .where('id', '=', id)
      .update({ ...data, updated_at: new Date() });
  };

  static deleteById = async (knex, id) => {
    return knex(this.tablePath).where('id', '=', id).del();
  };
}

module.exports = Roles;
