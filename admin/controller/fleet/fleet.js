const axios = require('axios');
const jwt = require('jsonwebtoken');
const { route } = require('../../routes/fleet/fleet');
const { header } = require('express-validator');



exports.signUpFleet = async(req, res) => {
    const token = req.cookies.token; // Extract token from cookies
    console.log(token);
    // Check if the logged-in user is an admin
    if (req.user.userType !== 'admin') {
        res.redirect("/sign-in");
        return res.status(403).json({
            success: false,
            message: 'Access denied: You are not allowed',
        });
    }

    try {
        const token = req.cookies.token; // Extract token from cookies
        // Make a request to register the fleet
        const response = await axios.post(`${process.env.APP_URI}/fleet/register`, req.body, {
            headers: {
                Authorization: `Bearer ${token}` // Pass token in the headers
            }
        });
        const fleet = response.data.data;
        console.log(fleet) // Access the pending fleet data
        return res.redirect('/fleet');
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

exports.getNewFleet = async(req, res) => {
    try {
            const token = req.cookies.token;
            const response = await axios.get(`${process.env.APP_URI}/admin/fleet/new`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fleets = response.data.data;
            if (!fleets) {
                return res.status(404).render('admin/components/fleet/new-fleet', { fleet: null, error: 'fleet not found.' });
            }
            return res.status(200).render('admin/components/fleet/new-fleet', { fleets, error: null});
     } catch (error) {
        console.log(error)
    }
}

exports.getVerifyFleet = async (req, res) => {
    try {
        const token = req.cookies.token;

        const response = await axios.get(`${process.env.APP_URI}/admin/fleet/verified`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const fleets = response.data.data;

        if (!fleets || fleets.length === 0) {
            return res.status(404).render('admin/components/fleet/approved-fleet', {
                fleets: [],
                error: 'No verified fleets found.'
            });
        }

        return res.status(200).render('admin/components/fleet/approved-fleet', {
            fleets,
            error: null
        });

    } catch (error) {
        console.error('Error fetching verified fleets:', error.response?.data || error.message);
        return res.status(500).render('admin/components/fleet/approved-fleet', {
            fleets: [],
            error: 'Server error while fetching fleets.'
        });
    }
};


exports.verifyFleet = async (req, res) => {
    let fleetId;
    try {
            fleetId = req.params.id
            if(!fleetId) {

            }
            const token = req.cookies.token;
            const response = await axios.put(`${process.env.APP_URI}/admin/fleet/verify/${fleetId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fleets = response.data
            if(!fleets) {
                return res.status(404).render('admin/components/fleet/view-fleet',
                     { 
                    fleets: null, 
                    error: 'Error occur while Verify the fleet'
                });
            }
            res.redirect(`/fleet/${fleetId}`);
    } catch (error) {
        console.error('Error verifying fleet:', error.response?.data || error.message);
        res.status(500).json({ err: 'Failed to verify fleet' });
    }
};

exports.suspendFleet = async (req, res) => {
    let fleetId;
    try {
            fleetId = req.params.id
            if(!fleetId) {

            }
            const token = req.cookies.token;
            const response = await axios.put(`${process.env.APP_URI}/admin/fleet/suspend/${fleetId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fleets = response.data
            if(!fleets) {
                return res.status(404).render('admin/components/fleet/view-fleet',
                     { 
                    fleets: null, 
                    error: 'Error occur while Verify the fleet'
                });
            }
            res.redirect(`/fleet/${fleetId}`);
    } catch (error) {
        console.error('Error verifying fleet:', error.response?.data || error.message);
        res.status(500).json({ err: 'Failed to verify fleet' });
    }
};

exports.unsuspendfleet = async (req, res) => {
    let fleetId;
    try {
            fleetId = req.params.id
            if(!fleetId) {

            }
            const token = req.cookies.token;
            const response = await axios.put(`${process.env.APP_URI}/admin/fleet/unsuspend/${fleetId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const fleets = response.data
            if(!fleets) {
                return res.status(404).render('admin/components/fleet/view-fleet',
                     { 
                    fleets: null, 
                    error: 'Error occur while Verify the fleet'
                });
            }
            res.redirect(`/fleet/${fleetId}`);
    } catch (error) {
        console.error('Error verifying fleet:', error.response?.data || error.message);
        res.status(500).json({ err: 'Failed to verify fleet' });
    }
};


// remain alert to display in manage fleet 
exports.deleteFleet = async(req, res) => {
    let fleetId
    try {
        let fleetId = req.params.id
        const token = req.cookies.token;
        const response = await axios.delete(`${process.env.APP_URI}/admin/fleet/${fleetId}`, {
             headers: {
                    Authorization: `Bearer ${token}`
                }
        })
        res.send(response.data)
    } catch (error) {
        console.error('Error delete fleet:', error.response?.data || error.message);
        res.status(500).json({ err: 'Failed to verify fleet' });
    }
}



