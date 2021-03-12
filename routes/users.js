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
const { getUserWithEmail, getUserWithID, addUser, getUserIDWithMapID } = require('../db//queries/users-queries');
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

router.post("/myuserid", (req, res) => {
  const userId = req.session.user_id;
  console.log('The logged in user has an id of', userId)
  const { mapId } = req.body;
  console.log(req.body)
  getUserIDWithMapID(mapId)
    .then(mapOwnerId => {
      console.log('The maps owner has an id of', mapOwnerId.user_id)
      if (userId !== mapOwnerId.user_id) {
        return res.status(403).send('You are not authorized to perform this action.');
      }
      res.send('authorized');
    })
})

module.exports = router;
