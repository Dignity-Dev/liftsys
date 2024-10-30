const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');


// Middleware to authenticate and protect routes
const isAuthenticated = require('../../middleware/auth'); // Your custom auth middleware

// fetch all

router.get('/manage-payment', isAuthenticated, async(req, res) => {
    try {
        // const response = await axios.get(`${process.env.APP_URI}/admin/payments`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        // const payments = response.data;
        res.render('fleet/payment/payment');
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.render('error', { message: 'Error fetching payments.' });
    }
});



// delete
router.delete('/payments/:id', isAuthenticated, async(req, res) => {
    try {
        // await axios.delete(`${process.env.APP_URI}/payments/${req.params.id}`, {
        //     headers: {
        //         Authorization: `Bearer ${req.cookies.token}`
        //     }
        // });
        res.redirect('/manage-payment');
    } catch (error) {
        res.render('error', { message: 'Error deleting payment.' });
    }
});


module.exports = router;