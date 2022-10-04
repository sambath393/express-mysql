const { tableList } = require('./tableDb');

class Invoices {
  static tablePath = tableList.invoices;

  static fill = (obj) => {
    return {
      invId: parseInt(obj.invId),
      cid: parseInt(obj.cid),
      date: new Date(),
      remark: String(obj.remark),
      subTotal: parseFloat(obj.subTotal),
      tax: parseFloat(obj.tax),
      discount: parseFloat(obj.discount),
      grandTotal: parseFloat(obj.grandTotal),

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

module.exports = Invoices;
