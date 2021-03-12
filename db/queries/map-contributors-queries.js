const db = require('../../server');

// Create an entry of map editor history
const editMap = (mapID, userID) => {
  return db.query(`
    INSERT INTO map_contributors (map_id, user_id, edit_date)
    VALUES ($1, $2, current_timestamp) RETURNING *;`, [mapID, userID,]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};
// Gets a list of all maps by creator
const getRecentEdits = (mapID) => {
  return db.query(`
    SELECT map_id, maps.name AS map_name, map_contributors.user_id, users.name AS user_name, edit_date
    FROM map_contributors
    LEFT JOIN maps ON maps.id = map_id
    LEFT JOIN users ON users.id = maps.user_id
    WHERE map_id = $1
    ORDER BY edit_date DESC
    LIMIT 10;`, [mapID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
const totalMapsCreated = (userID) => {
  return db.query(`
    SELECT COUNT(*)
    FROM (
      SELECT maps.id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created, TRUNC(AVG(fav_maps.rating), 1) AS rating,
      users.name AS created_by, MIN(pins.image_url) AS img_url
      FROM maps
      JOIN users ON maps.user_id = users.id
      LEFT JOIN fav_maps ON fav_maps.map_id = maps.id
      LEFT JOIN pins ON pins.map_id = maps.id
      WHERE users.id = $1 AND maps.active = true AND pins.active = true
      GROUP BY maps.id, users.name
      ORDER BY maps.date_created DESC)
    AS contributed;`, [userID]
  )
    .then(response => response.rows[0])
    .catch(err => err);
};
//EXPORT FUNCTIONS
module.exports = {
  editMap,
  getRecentEdits,
  totalMapsCreated
};
