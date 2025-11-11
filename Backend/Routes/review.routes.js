const express = require('express');
const { createReview, getProductReviews, getCustomerReviews } = require('../Controller/review.controller');
const uploads = require('../utils/multerStorage');
const VerifyUser = require('../Middleware/VerifyUser');

const router = express.Router();

router.post('/create', VerifyUser, uploads.array('images', 5), createReview);
router.get('/product/:productId', getProductReviews);
router.get('/customer/:customerId', VerifyUser, getCustomerReviews);

module.exports = router;
