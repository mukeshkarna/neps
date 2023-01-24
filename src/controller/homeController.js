const config = require('../config/configure');

let homeController = {
  index: async (req, res) => {
    try {
      return res.render('dashboard', {
        ...config.layouts.main,
        title: 'Dashboard',
        breadcrumbs: [],
      });
    } catch (error) {
      req.flash('error_msg', 'something went wrong');
    }
  },
};

module.exports = homeController;
