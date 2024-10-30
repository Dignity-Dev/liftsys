const axios = require('axios');
const jwt = require('jsonwebtoken');

// Render Sign-in Page
exports.renderSignIn = (req, res) => {
    const token = req.cookies.token;

    // If token exists, verify it to confirm the user is authenticated
    if (token) {
        try {
            jwt.verify(token, process.env.SECRET); // Verify the token
            return res.redirect('/dashboard'); // Redirect to dashboard if the token is valid
        } catch (error) {
            // Clear the cookie if the token is invalid or expired
            res.clearCookie('token');
        }
    }

    // Render sign-in page if no valid token is found
    const error = req.query.error; // Retrieve error from query parameter
    res.render('admin/components/sign-in', { error });
};

exports.signin = async(req, res) => {
    try {
        // Send POST request to the login API
        const response = await axios.post(`${process.env.APP_URI}/user/login`, req.body);

        const accessToken = response.data.data.accessToken;

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);

        const errorMessage = (error.response && error.response.data && error.response.data.message) ?
            error.response.data.message :
            'Login failed';

        return res.render('admin/components/sign-in', { error: errorMessage });
    }
};


// Handle Sign-in and Fetch User Data


// exports.signin = async(req, res) => {
//     try {
//         // Send POST request to the login API
//         const response = await axios.post(`${process.env.APP_URI}/user/login`, req.body);
//         console.log('Login response:', response.data); // Log the login response

//         const accessToken = response.data.data.accessToken;
//         const userID = response.data.data.userID; // Assuming the user ID is in the response data

//         // Set token in a cookie
//         res.cookie('token', accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 24 * 60 * 60 * 1000
//         });

//         // Fetch user profile data using the user ID
//         const profileResponse = await axios.get(`${process.env.APP_URI}/admin/getOneUser/${userID}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });

//         console.log('Profile response:', profileResponse.data); // Log the profile response

//         const userProfile = profileResponse.data.data; // Assuming user data is in `data`

//         // Render the main layout with user profile data
//         return res.render('layouts/main', { userProfile });

//     } catch (error) {
//         console.error('Error:', error.response ? error.response.data : error.message);

//         const errorMessage = (error.response && error.response.data && error.response.data.message) ?
//             error.response.data.message :
//             'Login failed';

//         return res.render('admin/components/sign-in', { error: errorMessage });
//     }
// };





exports.signup = async(req, res) => {
    try {
        const response = await axios.post(`${process.env.APP_URI}/admin/register`, req.body);

        const accessToken = response.data.data.accessToken;

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.redirect('/dashboard');

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);

        const errorMessage = (error.response && error.response.data && error.response.data.message) ?
            error.response.data.message :
            'Signup failed';

        return res.render('admin/components/regme', { error: errorMessage });
    }
};


// Logout Route
exports.signOut = (req, res) => {
    res.clearCookie('token');
    // console.log('User logged out');
    // Redirect after clearing cookie
    return res.redirect('/sign-in');
};


// Render Sign-up Page
exports.renderSignUp = (req, res) => {
    res.render('admin/components/regme', { error: null });
};
