// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth/auth');

// Routes
// Render the signin page
router.get('/', authController.renderSignIn);
router.get('/sign-in', authController.renderSignIn);

// Handle the login
router.post('/sign-in', authController.signin);

// Render the signout
router.get('/logout', authController.signOut);

module.exports = router;