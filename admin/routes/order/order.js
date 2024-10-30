// routes/driver/driver.js
const express = require('express');
const router = express.Router();
const orderController = require('../../controller/order/order');
const authorize = require('../../../utils/middleware/adminMiddleware');

// Apply the authorization middleware to all routes within this router
// router.use(authorize);

// Routes
router.get('/manage-order', orderController.getAllOrders);
router.get('/order/:id', orderController.getOrderById);
router.get('/new-order', orderController.getPendingOrders);
router.post('/assign-driver', orderController.assignOrderToDriver);
router.get('/assigned-order', orderController.assignedOrders);


module.exports = router;