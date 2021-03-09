/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
router.get("/", (req, res) => {
  res.json({
    checking: ' it works',
    ueser: 'wouldn\'t you like to know'
  });
});

router.get("/login", (req, res) => {
  res.render('../views/login')
})

// DUMMY DATA DELETE THIS AFTER WE GET USERS WORKING
const users = {
  "userRandomID": {
    id: "Albert Einstein",
    email: "a@a",
    password: "a"
  }
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  for (const id in users) {
    if (users[id]['email'] === email && users[id]['password'] === password) {
      req.session.user_id = users[id]['id']
      return res.redirect('/')
    }
  }
  res.send('Please use email a@a and password a to login');
})

module.exports = router;

//
