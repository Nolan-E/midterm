const isLoggedIn = (req, res, next) => {
  if (req.session.user_name) {
    next();
  } else {
    showLoginForm();
    alert('Please log in to continue.')
  }
};

module.exports = {
  isLoggedIn
}
