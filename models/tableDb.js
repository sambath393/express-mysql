const tableList = {
  role_paths: 'role_paths',
  role_names: 'role_names',
  roles: 'roles',
  users: 'users',
  products: 'products',
  companies: 'companies',
  qoutes: 'qoutes',
  detail_qoute: 'detail_qoute',
  invoices: 'invoices',
  detail_invoice: 'detail_invoice',
  logs: 'logs',
};

const initMethod = ({ table }) => {
  table.boolean('is_updated');
  table.boolean('is_deleted');
  table.integer('created_by').unsigned();
  table.foreign('created_by').references(`${tableList.users}.id`);
  table.integer('updated_by').unsigned();
  table.foreign('updated_by').references(`${tableList.users}.id`);
  table.integer('deleted_by').unsigned();
  table.foreign('deleted_by').references(`${tableList.users}.id`);
  table.timestamps();
  table.datetime('deleted_at');
};

class GenerateDbTbl {
  static run = async (knex) => {
    await this.createRolePathTbl(knex);
    await this.createRoleNameTbl(knex);
    await this.createRoleTbl(knex);
    await this.createUserTbl(knex);
    await this.createProductTbl(knex);
    await this.createCompanyTbl(knex);
    await this.createQouteTbl(knex);
    await this.createDetailQouteTbl(knex);
    await this.createInvoiceTbl(knex);
    await this.createDetailInvoiceTbl(knex);
    await this.createLogsTbl(knex);

    // Add Data
    await this.createRolePathData(knex);

    // Add Super admin
    await this.insertSuperAdmin(knex)
  };

  static createRolePathTbl = async (knex) => {
    await knex.schema.createTable(tableList.role_paths, function (table) {
      table.increments();
      table.string('name');
    });
  };

  static createRoleNameTbl = async (knex) => {
    await knex.schema.createTable(tableList.role_names, function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
    });
  };

  static createRoleTbl = async (knex) => {
    await knex.schema.createTable(tableList.roles, function (table) {
      table.increments();
      table.integer('rpid').unsigned();
      table.foreign('rpid').references(`${tableList.role_paths}.id`);
      table.integer('rnid').unsigned();
      table.foreign('rnid').references(`${tableList.role_names}.id`);
      table.boolean('view');
      table.boolean('create');
      table.boolean('update');
      table.boolean('delete');
      table.timestamps();
    });
  };

  static createUserTbl = async (knex) => {
    await knex.schema.createTable(tableList.users, function (table) {
      table.increments();
      table.string('uid');
      table.string('user');
      table.string('pass');
      table.string('token');
      table.boolean('active');
      table.integer('rnid').unsigned();
      table.foreign('rnid').references(`${tableList.role_names}.id`);

      table.timestamps();
    });
  };

  static createProductTbl = async (knex) => {
    await knex.schema.createTable(tableList.products, function (table) {
      table.increments();
      table.integer('pid');
      table.string('image');
      table.string('description');
      table.string('remark');

      initMethod({ table });
    });
  };

  static createCompanyTbl = async (knex) => {
    await knex.schema.createTable(tableList.companies, function (table) {
      table.increments();
      table.integer('cid');
      table.string('image');
      table.string('name');
      table.string('tel');
      table.string('address');
      table.string('tax');
      table.string('remark');

      initMethod({ table });
    });
  };

  static createQouteTbl = async (knex) => {
    await knex.schema.createTable(tableList.qoutes, function (table) {
      table.increments();
      table.integer('qid');
      table.integer('cid').unsigned();
      table.foreign('cid').references(`${tableList.companies}.id`);
      table.datetime('date');
      table.string('remark');

      initMethod({ table });
    });
  };

  static createDetailQouteTbl = async (knex) => {
    await knex.schema.createTable(tableList.detail_qoute, function (table) {
      table.increments();
      table.integer('qid').unsigned();
      table.foreign('qid').references(`${tableList.qoutes}.id`);
      table.integer('pid').unsigned();
      table.foreign('pid').references(`${tableList.products}.id`);
      table.string('um');
      table.double('price');
      table.string('remark');

      initMethod({ table });
    });
  };

  static createInvoiceTbl = async (knex) => {
    await knex.schema.createTable(tableList.invoices, function (table) {
      table.increments();
      table.integer('invId');
      table.integer('cid').unsigned();
      table.foreign('cid').references(`${tableList.companies}.id`);
      table.datetime('date');
      table.string('remark');
      table.double('subTotal');
      table.double('tax');
      table.double('discount');
      table.double('grandTotal');

      initMethod({ table });
    });
  };

  static createDetailInvoiceTbl = async (knex) => {
    await knex.schema.createTable(tableList.detail_invoice, function (table) {
      table.increments();
      table.integer('invId').unsigned();
      table.foreign('invId').references(`${tableList.invoices}.id`);
      table.integer('pid').unsigned();
      table.foreign('pid').references(`${tableList.products}.id`);
      table.double('qty');
      table.double('price');
      table.double('total');
      table.double('remark');

      initMethod({ table });
    });
  };

  static createLogsTbl = async (knex) => {
    await knex.schema.createTable(tableList.logs, function (table) {
      table.increments();
      table.integer('created_by').unsigned();
      table.foreign('created_by').references(`${tableList.users}.id`);
      table.integer('rpid').unsigned();
      table.foreign('rpid').references(`${tableList.role_paths}.id`);
      table.string('action');
      table.string('message');
      table.timestamps();
    });
  };

  static createRolePathData = async (knex) => {
    const newArr = Object.keys(tableList).map((load) => ({
      name: tableList[load],
    }));

    await knex(tableList.role_paths).insert(newArr);
  };

  static insertSuperAdmin = async (knex) => {
    await knex(tableList.role_names).insert({name: 'Super Admin', created_at: new Date()})

    const getRolePath = await knex(tableList.role_paths).select();

    const getData = getRolePath.map(load => ({
      rnid: 1,
      rpid: load.id,
      view: 1,
      create: 1,
      update: 1,
      delete: 1,
      created_at: new Date()
    }))

    await knex(tableList.roles).insert(getData)
    await knex(tableList.users).insert({
      uid: 1,
      user: 'Super Admin',
      pass: null,
      token: null,
      active: 1,
      rnid: 1,
      created_at: new Date(),
    })
  }

  static deleteTbl = async (knex) => {
    await Object.keys(tableList)
      .reverse()
      .map(async (load) => {
        await knex.schema.dropTableIfExists(tableList[load]);
      });
  };
}

module.exports = {
  tableList,
  GenerateDbTbl,
};
