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
const { getUserWithEmail, getUserWithID, addUser } = require('../db//queries/users-queries');
const { isLoggedIn } = require('../public/scripts/middleware');


router.get("/about", (req, res) => {
  const userId = req.session.user_id;
  getUserWithID(userId)
    .then(data => {
      res.send(data);
    })

});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  getUserWithEmail(email)
    .then(data => {
      if (password !== data.password) {
        alert("Invalid username or password.");
      } else {
        req.session.user_id = data.id;
        req.session.user_name = data.name;
        req.session.email = data.email;
        res.send(data.name);
      }
    })
    .catch(() => res.status(401).send('Login error.'));
})

router.post("/register", (req, res) => {
  const registerObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  addUser(registerObj)
    .then(registeredUser => {
      console.log('The registered user is', registeredUser);
      req.session.user_id = registeredUser.id;
      req.session.user_name = registeredUser.name;
      req.session.email = registeredUser.email;
      res.send(req.session.user_name);
    })

})

router.get("/logout", isLoggedIn, (req, res) => {
  req.session = null;
  res.send("Successfully logged out.")
})

module.exports = router;
