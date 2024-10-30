const axios = require('axios');

// Render dashboard Page
exports.renderDashboard = async(req, res) => {
    const token = req.cookies.token;

    try {
        // Fetch dashboard data
        const { data: { data: dash } } = await axios.get(`${process.env.APP_URI}/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Fetch orders data for chart
        const { data: { data: orders } } = await axios.get(`${process.env.APP_URI}/admin/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        if (!dash) {
            return res.status(404).render('admin/components/dashboard', { dash: null, orders: null, error: 'Dashboard not found.' });
        }

        // Pass both dashboard and orders data to the view
        res.render('admin/components/dashboard', { dash, orders, error: null });
    } catch (error) {
        const { response } = error;

        if (response) {
            if (response.status === 404) {
                return res.status(404).render('admin/components/dashboard', { dash: null, orders: null, error: 'Dashboard not found.' });
            }
            if (response.status === 401) {
                return res.redirect('/sign-in');
            }
        }

        res.status(500).render('admin/components/dashboard', { dash: null, orders: null, error: 'Failed to fetch dashboard data.' });
    }
};
