const express = require('express');
const router  = express.Router();


//maps GET Routes

//will get all maps for sidebar display on initial load
router.get("/", (req, res) => {
  res.json({
    checking: ' it works',
    lat : 'lat here in decimal',
    long : 'lng here in decimal'
  });
});

//will get all maps for sidedbar that are users favorited maps
router.get('/favorites', (req, res) => {
  res.json({has: 'object that is all maps that have favorite'});

});

//will get
router.get("/:id", (req,res) => {
  res.json({ has: 'object that is specific map'});
});

//maps POST Routes
router.post('/', (req, res) => {
  res.status(200).send('ok');
});

module.exports = router;
