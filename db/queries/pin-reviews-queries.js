const db = require('../../server');

// Gets all pin reviews by a specific user
const getAllPinReviews = (userID) => {
  return db.query(`
    SELECT pin_id, user_id, stars, message AS pin_review_msg, users.name AS user_name,
    TO_CHAR(date_created::date, 'Mon dd, yyyy') AS date_reviewed, pins.title AS pin_title, pins.lat, pins.lng
    FROM pin_reviews
    JOIN users ON users.id = user_id
    JOIN pins ON pins.id = pin_id
    WHERE users.id = $1 AND pin_reviews.active = true AND pins.active = true
    ORDER BY date_reviewed DESC;`, [userID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Gets all reviews for a specific pin
const getAllReviewsByPin = (pinID) => {
  return db.query(`
    SELECT pin_id, user_id, stars, message AS pin_review_msg, users.name AS user_name,
    TO_CHAR(date_created::date, 'Mon dd, yyyy') AS date_reviewed, pins.title AS pin_title, pins.lat, pins.lng
    FROM pin_reviews
    JOIN users ON users.id = user_id
    JOIN pins ON pins.id = pin_id
    WHERE pin_id = $1 AND pin_reviews.active = true AND pins.active = true
    ORDER BY date_reviewed DESC;`, [pinID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Add a new review to pin reviews
const createNewPinReview = (userID, pinID, pinRevObj) => {
  return db.query(`
    INSERT INTO pin_reviews (pin_id, user_id, stars, message, date_created, active)
    VALUES ($1, $2, $3, $4, current_timestamp, default) RETURNING *;`, [pinID, userID, pinRevObj.stars, pinRevObj.message]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};

//EXPORT FUNCTIONS
module.exports = {
  getAllPinReviews,
  getAllReviewsByPin,
  createNewPinReview
};
