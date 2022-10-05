var express = require('express');
const {
  deleteProducts,
  updateProducts,
  createProducts,
  getProducts,
} = require('../../controllers/products');
var router = express.Router();

router.route('/').get(getProducts).post(createProducts).put(updateProducts).delete(deleteProducts);

module.exports = router;
