const express = require('express');
const router  = express.Router();
const {getAllReviewsByPin} = require('../db/queries/pin-reviews-queries');

router.get("/", (req, res) => {
  const test = {parks: 'this is going to be a object with valuable info at some point'};
  console.log(test);
  res.json(test);
});

router.get("/:id", (req, res) => {
  console.log('Console log from pins router file. Get individual pin');
  const pinId = req.params.id;
  getAllReviewsByPin(pinId)
  .then((allReviews) => {
    res.send(allReviews);

  })

})

module.exports = router;
