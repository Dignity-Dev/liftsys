// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/payment/payment');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/payment', paymentController.getAllpayment);

module.exports = router;
