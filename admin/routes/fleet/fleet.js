// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const fleetController = require('../../controller/fleet/fleet');
const authorize = require('../../../utils/middleware/adminMiddleware');


// Routes
// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Render the signup page
router.get('/fleet/sign-up', fleetController.renderFleetSignUp);

// Handle the login
router.post('/fleet/sign-up', fleetController.signUpFleet);

// to list all fleet
router.get('/manage-fleet', fleetController.getAllFleets);

// to get a fleet
router.get('/fleet/:id', fleetController.getfleetById);




module.exports = router;