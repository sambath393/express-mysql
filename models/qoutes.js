const { tableList } = require('./tableDb');

class Quotes {
  static tablePath = tableList.qoutes;

  static fill = (obj) => {
    return {
      qid: parseInt(obj.pid),
      cid: parseInt(obj.cid),
      date: new Date(),
      remark: String(obj.remark),

      is_updated: Boolean(obj.is_updated),
      is_deleted: Boolean(obj.is_deleted),
      created_by: parseInt(obj.created_by),
      updated_by: parseInt(obj.updated_by),
      deleted_by: parseInt(obj.deleted_by),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };
  };

  static getAll = async (knex) => {
    return knex(this.tablePath).select();
  };

  static getAllByPaginate = async (knex, paginate) => {

    const data = await knex(this.tablePath)
      .join(tableList.role_paths, `${this.tablePath}.rpid`, '=', `${tableList.role_paths}.id`)
      .join(tableList.role_names, `${this.tablePath}.rnid`, '=', `${tableList.role_names}.id`)
      .select('*')
      .offset((parseInt(paginate.current, 10) - 1) * parseInt(paginate.limit, 10))
      .limit(paginate.limit)
      .groupBy('rnid')
      .count('rnid', { as: 'rp_count' })
      .column({ rp_name: 'role_paths.name' }, { rn_name: 'role_names.name' });
      
    return {
      data,
      paginate: {
        current: parseInt(paginate.current, 10),
        limit: parseInt(paginate.limit, 10),
        total,
      },
    };
  };

  static create = async (knex, data, userId) => {
    return knex(this.tablePath).insert({
      ...data,
      is_updated: true,
      is_deleted: true,
      created_by: userId,
      created_at: new Date(),
    });
  };

  static updateById = async (knex, id, data, userId) => {
    return knex(this.tablePath)
      .where('id', '=', id)
      .update({ ...data, updated_by: userId, updated_at: new Date() });
  };

  static deleteById = async (knex, id, userId) => {
    return knex(this.tablePath)
      .where('id', '=', id)
      .update({ is_deleted: true, deleted_by: userId, deleted_at: new Date() });
  };
}

module.exports = Quotes;
