const db = require('../../server');

// Gets all favourited maps
const getAllFavMaps = (userID) => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, maps.date_created AS map_created,
    users.name AS created_by, fav_maps.rating, fav_maps.review
    FROM fav_maps
    JOIN maps ON fav_maps.map_id = maps.id
    JOIN users ON maps.user_id = users.id
    WHERE users.id = $1
    ORDER BY fav_date DESC;`, [userID]
  )
  .then(response => response.rows);
};

//EXPORT FUNCTIONS
module.exports = {
  getAllFavMaps
};
