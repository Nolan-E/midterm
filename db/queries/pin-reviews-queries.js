const db = require('../../server');

// Gets all favourited maps
const getAllPinReviews = (userID) => {
  return db.query(`
    SELECT pin_id, user_id, stars, message AS pin_review_msg,
    users.name AS user_name, date_created AS date_reviewed, pins.title AS pin_title, pins.lat, pins.lng
    FROM pin_reviews
    JOIN users ON users.id = user_id
    JOIN pins ON pins.id = pin_id
    WHERE users.id = $1
    ORDER BY date_reviewed DESC;`, [userID]
  )
  .then(response => response.rows)
  .catch(err => null);
};

// // Add a map to my fav maps
// const addToMyFav = (userID, mapID, rating, review) => {
//   return db.query(`
//     INSERT INTO fav_maps (user_id, map_id, rating, review, fav_date)
//     VALUES ($1, $2, $3, $4, current_timestamp) RETURNING *;`, [userID, mapID, rating, review]
//   )
//   .then(response => response.rows[0])
//   .catch(err => null);
// };

//EXPORT FUNCTIONS
module.exports = {
  getAllPinReviews,
  // addToMyFav
};
