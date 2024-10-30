// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../utils/middleware/adminMiddleware');
const driverController = require('../../controller/driver/driver');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/manage-driver', driverController.getAllDrivers);
// router.get('/new-driver', driverController.getNewDriverForm);
router.get('/driver/:id', driverController.getDriverById);
// router.get('/update-driver/:id', driverController.getUpdateDriverForm);
// router.patch('/drivers/:id', driverController.updateDriver);
// router.delete('/drivers/:id', driverController.deleteDriver);

module.exports = router;