const express = require('express');
const router  = express.Router();
const {getAllReviewsByPin} = require('../db/queries/pin-reviews-queries');
const {deletePin, editPin} = require('../db/queries/pins-queries');

router.get("/", (req, res) => {
  const test = {parks: 'this is going to be a object with valuable info at some point'};
  console.log(test);
  res.json(test);
});

router.post("/:id/delete", (req, res) => {
  console.log("Trying to delete the pin now...");
  const userId = req.session.user_id;
  const pinId = req.params.id;
  deletePin(userId, pinId)
    .then((response) => {
      if (!response) {
        return res.send("Error deleting pin.");
      }
      res.send("Pin has been deleted");
    })
    .catch(error => {console.log('error is', error)})
})

router.post("/:id/edit", (req, res) => {
  console.log("Trying to update the pin now...");
  const {pinId} = req.body;
  const userId = req.session.user_id;
  console.log('pin id', pinId, 'userId', userId)
  editPin(userId, pinId, req.body)
    .then(() => {
      return res.send('Pin successfully updated.')
    })
    .catch(error => {console.log('error is', error)})
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
