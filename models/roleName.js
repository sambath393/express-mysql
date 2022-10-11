const { tableList } = require('./tableDb');

class RoleName {
  static tablePath = tableList.role_names;

  static fill = (obj) => {
    return {
      name: String(obj.name),
      created_at: new Date(),
      updated_at: new Date(),
    };
  };

  static getAll = async (knex) => {
    return knex.select().from(this.tablePath);
  };

  static create = async (knex, data) => {
    return knex(this.tablePath).insert({ ...data, created_at: new Date() }).then(res => res.length ? res[0] : false);
  };

  static createWithRoles = async (knex, data) => {
    const rnid = knex(this.tablePath)
      .insert({ ...data, created_at: new Date() })
      .then(async (res) => {
        const id = res.length ? res[0] : false;

        const getRolePath = await knex(tableList.role_paths).select();

        const getData = await getRolePath.map((load) => ({
          rnid: id,
          rpid: load.id,
          view: 0,
          create: 0,
          update: 0,
          delete: 0,
          created_at: new Date(),
        }));

        await knex(tableList.roles).insert(getData)
        
        return id
      });

    return rnid;
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

module.exports = RoleName;
