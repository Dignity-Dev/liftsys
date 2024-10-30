const axios = require('axios');

// Fetch all vehicle from API

exports.getAllVehicle = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/admin/getallvehicles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const vehicle = response.data.data;
        if (!vehicle || vehicle.length === 0) {
            return res.render('admin/components/vehicle/vehicle', { vehicle: [], error: 'No vehicle available.' });
        }

        res.render('admin/components/vehicle/vehicle', { vehicle, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('admin/components/vehicle/vehicle', { vehicle: [], error: 'Error fetching vehicle.' });
    }
};


exports.getvehicleById = async(req, res) => {
    let vehicleId; // Declare vehicleId outside the try block so it's accessible everywhere

    try {
        vehicleId = req.params.id; // Get vehicle ID from the route parameters
        const token = req.cookies.token; // Extract token from cookies

        // console.log('Fetching vehicle with ID:', vehicleId); // Debug log for vehicle ID

        // Fetch vehicle data from the external API using query parameters
        const response = await axios.get(`${process.env.APP_URI}/admin/get-one-vehicle/${vehicleId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass token in the headers
            },
            params: {
                userID: vehicleId, // Send userID as a query parameter
            }
        });

        const vehicle = response.data.data; // Access the vehicle data

        if (!vehicle || vehicle.length === 0) {
            console.log(`vehicle with ID: ${vehicleId} not found.`);
            return res.status(404).render('admin/components/vehicle/view-vehicle', { vehicle: null, error: 'vehicle not found.' });
        }

        // Render the vehicle details page with the retrieved data
        console.log('vehicle fetched successfully:', vehicle);
        res.render('admin/components/vehicle/view-vehicle', { vehicle, error: null });

    } catch (error) {
        console.error('Error fetching vehicle:', error.response ? error.response.data : error.message);

        if (error.response && error.response.status === 404) {
            console.log(`vehicle with ID: ${vehicleId} not found.`); // vehicle ID will now be accessible
            return res.status(404).render('admin/components/vehicle/view-vehicle', { vehicle: null, error: 'vehicle not found.' });
        }

        // Handle token-related errors, such as expiration or invalid token
        if (error.response && error.response.status === 401) {
            console.log('Invalid or expired token, redirecting to sign-in page.');
            return res.redirect('/sign-in');
        }

        // Handle other API errors
        res.status(500).render('admin/components/vehicle/view-vehicle', { vehicle: null, error: 'Error fetching vehicle details.' });
    }
};


// Render edit vehicle form with current vehicle details
// exports.getUpdatevehicleForm = async(req, res) => {
//     try {
//         const vehicleId = req.params.id; // Get vehicle ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Fetch current vehicle data from the external API
//         const response = await axios.get(`${process.env.APP_URI}/admin/vehicle/${vehicleId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         const vehicle = response.data.data; // Access the vehicle data

//         if (!vehicle) {
//             return res.status(404).render('admin/vehicle/update-vehicle', { vehicle: null, error: 'vehicle not found.' });
//         }

//         // Render the edit vehicle form with the current vehicle details
//         res.render('admin/vehicle/update-vehicle', { vehicle, error: null });

//     } catch (error) {
//         console.error('Error fetching vehicle for editing:', error.response ? error.response.data : error.message);

//         if (error.response && error.response.status === 404) {
//             return res.status(404).render('admin/vehicle/update-vehicle', { vehicle: null, error: 'vehicle not found.' });
//         }

//         // Handle other errors
//         res.status(500).render('admin/vehicle/update-vehicle', { vehicle: null, error: 'Error fetching vehicle details.' });
//     }
// };

// Update vehicle details
// exports.updatevehicle = async(req, res) => {
//     try {
//         const vehicleId = req.params.id; // Get vehicle ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Update vehicle data through the external API
//         const response = await axios.patch(`${process.env.APP_URI}/admin/vehicle/${vehicleId}`, req.body, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Assuming the update was successful and you want to redirect back to vehicle details
//         res.redirect(`/vehicle/${vehicleId}`); // Redirect to the vehicle's detail page after successful update

//     } catch (error) {
//         console.error('Error updating vehicle:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('admin/vehicle/update-vehicle', { vehicle: req.body, error: 'Error updating vehicle details.' });
//     }
// };

// Delete vehicle by ID
// exports.deletevehicle = async(req, res) => {
//     try {
//         const vehicleId = req.params.id; // Get vehicle ID from the route parameters
//         const token = req.cookies.token; // Extract token from cookies

//         // Send DELETE request to the external API to delete the vehicle
//         await axios.delete(`${process.env.APP_URI}/admin/vehicle/${vehicleId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Pass token in headers
//             }
//         });

//         // Redirect to the vehicle list page after successful deletion
//         res.redirect('/manage-vehicle'); // Redirect to the list of vehicle after deletion

//     } catch (error) {
//         console.error('Error deleting vehicle:', error.response ? error.response.data : error.message);

//         // Handle token-related errors
//         if (error.response && error.response.status === 401) {
//             console.log('Invalid or expired token, redirecting to sign-in page.');
//             return res.redirect('/sign-in');
//         }

//         // Handle other API errors
//         res.status(500).render('admin/vehicle/vehicle', { error: 'Error deleting vehicle.' });
//     }
// };