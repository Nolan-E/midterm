const db = require('../../server');

// Gets all favourited maps
const getAllFavMaps = (userID) => {
  return db.query(`
    SELECT fav_maps.map_id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created,
    users.name AS created_by, fav_maps.rating, fav_maps.review, MIN(pins.image_url) AS img_url
    FROM fav_maps
    JOIN maps ON fav_maps.map_id = maps.id
    LEFT JOIN pins ON pins.map_id = maps.id
    LEFT JOIN users ON maps.user_id = users.id
    WHERE fav_maps.user_id = $1 AND maps.active = true AND fav_maps.active = true
    GROUP BY maps.id, users.name, pins.image_url, fav_maps.map_id, fav_maps.rating, fav_maps.review, fav_maps.fav_date
    ORDER BY fav_date DESC;`, [userID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Add a map to my fav maps
const addToMyFav = (userID, mapID) => {
  return db.query(`
    INSERT INTO fav_maps (user_id, map_id, fav_date)
    VALUES ($1, $2, current_timestamp) RETURNING *;`, [userID, mapID]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};
// Remove a map from my fav maps
const deleteMyFav = (userID, mapID) => {
  return db.query(`
    UPDATE fav_maps
    SET active = false
    WHERE map_id = $2 AND user_id = $1 RETURNING *;`, [userID, mapID]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};
// Add a rating & review to a fav map by user
const addFavReviewRating = (userID, mapID, rating, review) => {
  return db.query(`
    UPDATE fav_maps
    SET rating = $3, review = $4, last_edit = current_timestamp
    WHERE user_id = $1 and map_id = $2 RETURNING *;`, [userID, mapID, rating, review]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};

//EXPORT FUNCTIONS
module.exports = {
  getAllFavMaps,
  addToMyFav,
  deleteMyFav,
  addFavReviewRating
};
