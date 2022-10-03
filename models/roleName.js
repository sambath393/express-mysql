const { tableList } = require("./tableDb");

class RoleName {
  static tablePath = tableList.role_names;

  static fill = (obj) => {
    return {
      name: String(obj.name),
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static getAll = async (knex) => {
    return knex.select().from(this.tablePath)
  }

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() });
  };

  static updateById = async (knex, id, data) => {
    return knex(this.tablePath).where('id', '=', id).update({ ...data, updated_at: new Date() });
  };

  static deleteById = async (knex, id) => {
    return knex(this.tablePath).where('id', '=', id).del();
  }
}

module.exports = RoleName