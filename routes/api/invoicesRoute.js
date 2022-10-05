var express = require('express');
const {
  getInvoices,
  createInvoices,
  updateInvoices,
  deleteInvoices,
} = require('../../controllers/invoices');
const {
  getInvoicesDetail,
  createInvoicesDetail,
  updateInvoicesDetail,
  deleteInvoicesDetail,
} = require('../../controllers/invoicesDetail');
var router = express.Router();

router.route('/').get(getInvoices).post(createInvoices).put(updateInvoices).delete(deleteInvoices);
router
  .route('/detail')
  .get(getInvoicesDetail)
  .post(createInvoicesDetail)
  .put(updateInvoicesDetail)
  .delete(deleteInvoicesDetail);

module.exports = router;
