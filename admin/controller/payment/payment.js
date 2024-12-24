const axios = require('axios');

// Render form to create a new driver

exports.getAllPayment = async(req, res) => {
    try {
        const token = req.cookies.token;
        const response = await axios.get(`${process.env.APP_URI}/admin/drivers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const drivers = response.data.data;
        if (!drivers || drivers.length === 0) {
            return res.render('admin/components/payment/payment', { drivers: [], error: 'No payment available.' });
        }

        res.render('admin/components/payment/payment', { drivers, error: null });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return res.redirect('/sign-in');
        }

        res.render('admin/components/payment/payment', { drivers: [], error: 'Error fetching payment.' });
    }
};
