const express = require('express');
const router  = express.Router();
const {getAllReviewsByPin} = require('../db/queries/pin-reviews-queries');
const {deletePin} = require('../db/queries/pins-queries');

router.get("/", (req, res) => {
  const test = {parks: 'this is going to be a object with valuable info at some point'};
  console.log(test);
  res.json(test);
});

router.post("/:id/delete", (req, res) => {
  console.log("Trying to delete the pin now...");
  const userId = req.session.user_id;
  const pinId = req.params.id;
  console.log('deletePin', userId, pinId)
  deletePin(userId, pinId)
    .then((response) => {
      if (!response) {
        return res.send("Error deleting pin.");
      }
      // console.log('rresponse from db is', response)
      res.send("Pin has been deleted");
    })
    .catch(error => {
      console.log('error is', error)
    })

})


router.get("/:id", (req, res) => {
  console.log('Console log from pins router file. Get individual pin');
  const pinId = req.params.id;
  getAllReviewsByPin(pinId)
  .then((allReviews) => {
    res.send(allReviews);

  })
})



module.exports = router;
