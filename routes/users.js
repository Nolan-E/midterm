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

router.post("/login", (req, res) => {
  req.session.user_id = req.params.id
  res.redirect('/')
})

module.exports = router;
