// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../../controller/vehicle/vehicle');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/manage-vehicle', vehicleController.getAllVehicle);
router.get('/vehicle/:id', vehicleController.getvehicleById);

module.exports = router;