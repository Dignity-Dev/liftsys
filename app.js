const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Import middleware
const setupMiddleware = require('./utils/middleware/middleware');

// Set up middleware
setupMiddleware(app);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder for assets
app.use(express.static(path.join(__dirname, 'assets')));

// start of admin route

// Import Routes
const authRoutes = require('./admin/routes/auth/auth');
const dashboardRoutes = require('./admin/routes/dashboard');
const driverRoutes = require('./admin/routes/driver/driver');
const customerRoutes = require('./admin/routes/customer/customer');
const orderRoutes = require('./admin/routes/order/order');
const fleetoutes = require('./admin/routes/fleet/fleet');
const vehicleRoutes = require('./admin/routes/vehicle/vehicle');


// Use Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', driverRoutes);
app.use('/', customerRoutes);
app.use('/', orderRoutes);
app.use('/', fleetoutes);
app.use('/', vehicleRoutes);
// end of admin route

// Catch-all route for handling 404 errors
app.use((req, res) => {
    // Redirect to the sign-in page if the route is not found
    res.redirect('/sign-in');
});


// Error handling middleware
const errorHandler = require('./utils/middleware/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
