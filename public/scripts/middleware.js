const isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).send('Please log in to view this content.');
  }
  next()
};

module.exports = {
  isLoggedIn
}
