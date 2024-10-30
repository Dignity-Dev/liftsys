const axios = require('axios');




// Render form to create a new driver

exports.getAllDrivers = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const drivers = response.data.data;
        if (!drivers || drivers.length === 0) {
            return res.render('admin/components/driver/driver', { drivers: [], error: 'No drivers available.' });
        }

        res.render('admin/components/driver/driver', { drivers, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('admin/components/driver/driver', { drivers: [], error: 'Error fetching drivers.' });
    }
};


// exports.getNewDriverForm = (req, res) => {
//     res.render('admin/driver/new-driver');
// };

exports.getDriverById = async(req, res) => {
    let driverId; // Declare driverId outside the try block so it's accessible everywhere

    try {
        driverId = req.params.id; // Get driver ID from the route parameters
        const token = req.cookies.token; // Extract token from cookies

        // console.log('Fetching driver with ID:', driverId); // Debug log for driver ID

        // Fetch driver data from the external API using query parameters
        const response = await axios.get(`${process.env.APP_URI}/admin/getOneDriver/${driverId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the headers
            },
        });

        const driver = response.data.data; // Access the driver data

        if (!driver || driver.length === 0) {
            // console.log(`Driver with ID: ${driverId} not found.`);
            return res.status(404).render('admin/components/driver/view-driver', { driver: null, error: 'Driver not found.' });
        }

        // Render the driver details page with the retrieved data
        // console.log('Driver fetched successfully:', driver);
        res.render('admin/components/driver/view-driver', { driver, error: null });

    } catch (error) {
        console.error('Error fetching driver:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 404) {
            // console.log(`Driver with ID: ${driverId} not found.`); // Driver ID will now be accessible
            return res.status(404).render('admin/components/driver/view-driver', { driver: null, error: 'Driver not found.' });
        }

        // Handle token-related errors, such as expiration or invalid token
        if (error.response && error.response.status === 401) {
            // console.log('Invalid or expired token, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Handle other API errors
        res.status(500).render('admin/components/driver/view-driver', { driver: null, error: 'Error fetching driver details.' });
    }
};


// Render edit driver form with current driver details
// exports.getUpdateDriverForm = async(req, res) => {
//     try {
//         const driverId = req.params.id; // Get driver ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Fetch current driver data from the external API
//         const response = await axios.get(`${process.env.APP_URI}/admin/drivers/${driverId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         const driver = response.data.data; // Access the driver data

//         if (!driver) {
//             return res.status(404).render('admin/driver/update-driver', { driver: null, error: 'Driver not found.' });
//         }

//         // Render the edit driver form with the current driver details
//         res.render('admin/driver/update-driver', { driver, error: null });

//     } catch (error) {
//         console.error('Error fetching driver for editing:', error.response ? error.response.data : error.message);

//         if (error.response && error.response.status === 404) {
//             return res.status(404).render('admin/driver/update-driver', { driver: null, error: 'Driver not found.' });
//         }

//         // Handle other errors
//         res.status(500).render('admin/driver/update-driver', { driver: null, error: 'Error fetching driver details.' });
//     }
// };

// Update driver details
// exports.updateDriver = async(req, res) => {
//     try {
//         const driverId = req.params.id; // Get driver ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Update driver data through the external API
//         const response = await axios.patch(`${process.env.APP_URI}/admin/drivers/${driverId}`, req.body, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Assuming the update was successful and you want to redirect back to driver details
//         res.redirect(`/drivers/${driverId}`); // Redirect to the driver's detail page after successful update

//     } catch (error) {
//         console.error('Error updating driver:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('admin/driver/update-driver', { driver: req.body, error: 'Error updating driver details.' });
//     }
// };

// Delete driver by ID
// exports.deleteDriver = async(req, res) => {
//     try {
//         const driverId = req.params.id; // Get driver ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Send DELETE request to the external API to delete the driver
//         await axios.delete(`${process.env.APP_URI}/admin/drivers/${driverId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Redirect to the drivers list page after successful deletion
//         res.redirect('/manage-driver'); // Redirect to the list of drivers after deletion

//     } catch (error) {
//         console.error('Error deleting driver:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('admin/driver/drivers', { error: 'Error deleting driver.' });
//     }
// };

// Render update form for a driver
// exports.getUpdateDriverForm = async(req, res) => {
//     try {
//         res.render('admin/driver/update-driver', { driver: {} });
//     } catch (error) {
//         res.render('error', { message: 'Error rendering update driver form.' });
//     }
// };

// Update driver details
// exports.updateDriver = async(req, res) => {
//     try {
//         // await axios.patch(`${process.env.APP_URI}/drivers/${req.params.id}`, req.body, {
//         //     headers: {
//         //         Authorization: `Bearer ${req.cookies.token}`
//         //     }
//         // });
//         res.redirect(`/manage-driver`);
//     } catch (error) {
//         res.render('error', { message: 'Error updating driver.' });
//     }
// };

// Delete a driver
// exports.deleteDriver = async(req, res) => {
//     try {
//         // await axios.delete(`${process.env.APP_URI}/drivers/${req.params.id}`, {
//         //     headers: {
//         //         Authorization: `Bearer ${req.cookies.token}`
//         //     }
//         // });
//         res.redirect('/manage-driver');
//     } catch (error) {
//         res.render('error', { message: 'Error deleting driver.' });
//     }
// };