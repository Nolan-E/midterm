const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  const test = {parks: 'this is going to be a object with valuable info at some point'};
  console.log(test);
  res.json(test);
});

module.exports = router;
