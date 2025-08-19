// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const fleetController = require('../../controller/fleet/fleet');
const authorize = require('../../../utils/middleware/adminMiddleware');


// Routes
// Apply the authorization middleware to all routes within this router
router.use(authorize);

// Render the signup page
router.get('/fleet/new-fleet', fleetController.renderFleetSignUp);

// Handle the login
router.post('/fleet/new-fleet', fleetController.signUpFleet);

// to list all fleet
router.get('/manage-fleet', fleetController.getAllFleets);

// to get a fleet
router.get('/fleet/:id', fleetController.getfleetById);


router.get('/new-fleet/', fleetController.getNewFleet);

router.get('/approved-fleet/', fleetController.getVerifyFleet);

router.get('/verify-fleet/:id', fleetController.verifyFleet);

router.get('/suspend-fleet/:id', fleetController.suspendFleet);

router.get('/unsuspend-fleet/:id', fleetController.unsuspendfleet);

router.get('/delete-fleet/:id', fleetController.deleteFleet);





module.exports = router;
