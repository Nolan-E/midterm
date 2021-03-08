const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log('the / post route');
    return res.status(200).send('ok');


  });
  return router;
};
