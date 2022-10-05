var express = require('express');
const { createQoutes, getQoutes, updateQoutes, deleteQoutes } = require('../../controllers/qoutes');
const {
  getQoutesDetail,
  createQoutesDetail,
  updateQoutesDetail,
  deleteQoutesDetail,
} = require('../../controllers/qoutesDetail');
var router = express.Router();

router.route('/').get(getQoutes).post(createQoutes).put(updateQoutes).delete(deleteQoutes);
router
  .route('/detail')
  .get(getQoutesDetail)
  .post(createQoutesDetail)
  .put(updateQoutesDetail)
  .delete(deleteQoutesDetail);

module.exports = router;
