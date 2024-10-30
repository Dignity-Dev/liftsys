// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const customerController = require('../../controller/customer/customer');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/manage-customer', customerController.getAllCustomers);
// router.get('/new-driver', driverController.getNewDriverForm);
router.get('/customer/:id', customerController.getCustomerById);
// router.get('/update-driver/:id', driverController.getUpdateDriverForm);
// router.patch('/drivers/:id', driverController.updateDriver);
// router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;