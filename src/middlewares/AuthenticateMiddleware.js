exports.loggedIn = async (req, res, next) => {
  if (req.session.user) {
    // req.session.passport._id
    next();
  } else {
    res.redirect('/login');
  }
};

exports.guest = async (req, res, next) => {
  if (req.session.user) {
    // req.session.passport._id
    res.redirect('/home');
  } else {
    next();
  }
};
