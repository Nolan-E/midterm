const express = require('express');
const router  = express.Router();


//maps GET Routes
router.get("/", (req, res) => {
  res.json({
    checking: ' it works',
    lat : 'lat here in decimal',
    long : 'lng here in decimal'
  });
});


router.post("/", (req, res) => {
  res.status(200).send('ok');
});

module.exports = router;
