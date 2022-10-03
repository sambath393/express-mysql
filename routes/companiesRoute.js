var express = require('express');
const {
  getCompanies,
  createCompanies,
  updateCompanies,
  deleteCompanies,
} = require('../controllers/companies');
var router = express.Router();

router
  .route('/')
  .get(getCompanies)
  .post(createCompanies)
  .put(updateCompanies)
  .delete(deleteCompanies);

module.exports = router;
