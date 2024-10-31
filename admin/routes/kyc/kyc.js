// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const kycController = require('../../controller/kyc/kyc');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/kyc', kycController.getAllkyc);

module.exports = router;
