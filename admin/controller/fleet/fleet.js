const axios = require('axios');
const jwt = require('jsonwebtoken');


// Handle Sign-up
// Fleet controller (signUpFleet)
// Fleet controller (signUpFleet)
exports.signUpFleet = async(req, res) => {
    // Check if the logged-in user is an admin
    if (req.user.userType !== 'admin') {
        res.redirect("/sign-in");
        return res.status(403).json({
            success: false,
            message: 'Access denied: You are not allowed',
        });
    }

    try {
        // Extract token from request headers
        const token = req.cookies.token;
        // Make a request to register the fleet
        const response = await axios.post(`${process.env.APP_URI}/fleet/register`, req.body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // After successful fleet registration, redirect to the dashboard
        return res.redirect('/manage-fleet');
    } catch (error) {
        // Handle errors during the fleet registration
        const errorMessage = error.response && error.response.data && error.response.data.message ?
            error.response.data.message :
            'Fleet registration failed';

        return res.status(400).json({
            success: false,
            message: errorMessage,
        });
    }
};




exports.renderFleetSignUp = (req, res) => {
    res.render('admin/layouts/fleet/new-fleet', { error: null });
};


// route to list all fleet
exports.getAllFleets = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/admin/getallfleets`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const fleets = response.data.data;
        // console.log(fleets)
        if (!fleets || fleets.length === 0) {
            return res.render('admin/components/fleet/fleet', { fleets: [], error: 'No fleets available.' });
        }

        res.render('admin/components/fleet/fleet', { fleets, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('admin/components/fleet/fleet', { fleets: [], error: 'Error fetching fleets.' });
    }
};

// Fetch an fleet by ID
exports.getfleetById = async(req, res) => {
    let fleetId;

    try {
        fleetId = req.params.id; // Get fleet ID from the route parameters
        const token = req.cookies.token;

        const response = await axios.get(`${process.env.APP_URI}/admin/get-one-fleet/${fleetId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const fleet = response.data.data;
        // console.log(fleet)
        if (!fleet) {
            return res.status(404).render('admin/components/fleet/view-fleet', { fleet: null, error: 'fleet not found.' });
        }

        res.render('admin/components/fleet/view-fleet', { fleet, error: null });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).render('admin/components/fleet/view-fleet', { fleet: null, error: 'fleet not found.' });
        }
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }
        res.status(500).render('admin/components/fleet/view-fleet', { fleet: null, error: 'Failed to fetch fleet.' });
    }
};