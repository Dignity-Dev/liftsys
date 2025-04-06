// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../../controller/vehicle/vehicle');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Routes
router.get('/manage-vehicle', vehicleController.getAllVehicle);
router.get('/awaiting-vehicle', vehicleController.getAwaitingVehicle);
router.get('/vehicle/:id', vehicleController.getvehicleById);


// Approve Vehicle
router.put("/approve/:vehicleID", vehicleController.approveVehicle);

// Reject Vehicle
router.put("/reject/:vehicleID", vehicleController.rejectVehicle);

// Deactivate Vehicle
router.put("/deactivate/:vehicleID", vehicleController.deactivateVehicle);

module.exports = router;
