const db = require('../../server');

// Gets a list of all available maps
const getAllMapsAnon = () => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created, TRUNC(AVG(fav_maps.rating), 1) AS rating,
    users.name AS created_by, MIN(pins.image_url) AS img_url
    FROM maps
    JOIN users ON maps.user_id = users.id
    LEFT JOIN fav_maps ON fav_maps.map_id = maps.id
    LEFT JOIN pins ON pins.map_id = maps.id
    WHERE maps.active = true AND pins.active = true
    GROUP BY maps.id, users.name
    ORDER BY maps.date_created DESC;`
  )
    .then(response => response.rows)
    .catch(err => err);
};
const getAvgRatingForMap = (mapID) => {
  return db.query(`
  SELECT avg(rating) FROM fav_maps
  JOIN maps ON map_id = maps.id
  WHERE map_id = $1 AND maps.active = true;
  `, [mapID])
    .then(response => response.rows[0])
};
// Gets a list of top rated maps
const getTopRated = () => {
  return db.query(`
    SELECT maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created,
    users.name AS created_by, TRUNC(AVG(fav_maps.rating), 1) AS rating, MIN(pins.image_url) AS img_url
    FROM maps
    JOIN users ON maps.user_id = users.id
    JOIN fav_maps ON fav_maps.map_id = maps.id
    JOIN pins ON pins.map_id = maps.id
    WHERE maps.active = true AND pins.active = true
    GROUP BY maps.id, users.name
    ORDER BY rating DESC
    LIMIT 5;`
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Might change pins table join from outer to inner
// Gets a list of all maps by creator
const getAllMapsByUser = (userID) => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created, TRUNC(AVG(fav_maps.rating), 1) AS rating,
    users.name AS created_by, MIN(pins.image_url) AS img_url
    FROM maps
    JOIN users ON maps.user_id = users.id
    LEFT JOIN fav_maps ON fav_maps.map_id = maps.id
    LEFT JOIN pins ON pins.map_id = maps.id
    WHERE users.id = $1 AND maps.active = true AND pins.active = true
    GROUP BY maps.id, users.name
    ORDER BY maps.date_created DESC;`, [userID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
  // Gets a map by map_id
  const getMapsByID = (mapID) => {
    return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created,
    users.name AS created_by, TRUNC(AVG(fav_maps.rating), 1) AS rating, MIN(pins.image_url) AS img_url
    FROM maps
    JOIN users ON maps.user_id = users.id
    JOIN fav_maps ON fav_maps.map_id = maps.id
    JOIN pins ON pins.map_id = maps.id
    WHERE maps.id = $1 AND maps.active = true AND pins.active = true
    GROUP BY maps.id, users.name;`, [mapID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Gets a specific map of pins by map_id
const getMapOfPinsByID = (mapID) => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, TO_CHAR(maps.date_created::date, 'Mon dd, yyyy') AS map_created,
    users.name AS created_by, TRUNC(AVG(fav_maps.rating), 1) AS rating, pins.id AS pin_id, pins.lat AS pin_lat,
    pins.lng AS pin_lng, pins.title AS pin_title, pins.description AS pin_description, MIN(pins.image_url) AS img_url
    FROM maps
    JOIN users ON maps.user_id = users.id
    JOIN fav_maps ON fav_maps.map_id = maps.id
    JOIN pins ON maps.id = pins.map_id
    WHERE maps.id = $1 AND maps.active = true AND pins.active = true
    GROUP BY maps.id, users.name, pins.id
    ORDER BY pin_id;`, [mapID]
  )
    .then(response => response.rows)
    .catch(err => err);
};
// Save new map to database
const createNewMap = (userID, mapName) => {
  return db.query(`
    INSERT INTO maps (name, user_id, date_created)
    VALUES ($1, $2, current_timestamp) RETURNING maps.id;
  `, [mapName, userID])
    .then(response => response.rows[0])
    .catch(err => err);
};
// Delete map
const deleteMap = (userID, mapID) => {
  return db.query(`
    UPDATE maps
    SET active = false
    FROM users
    WHERE users.id = user_id AND user_id = $1 AND maps.id = $2 RETURNING maps.*;`, [userID, mapID]
  )
    .then(response => response.rows[0])
    .catch(err => err)
};
// Edit map
const editMap = (userID, mapID, mapName) => {
  return db.query(`
    UPDATE maps
    SET maps.name = $3
    FROM users
    WHERE users.id = user_id AND user_id = $1 AND maps.id = $2 RETURNING maps.*;`, [userID, mapID, mapName]
  )
    .then(response => response.rows[0])
    .catch(err => err)
};

//EXPORT FUNCTIONS
module.exports = {
  getAllMapsAnon,
  getAvgRatingForMap,
  getTopRated,
  getAllMapsByUser,
  getMapsByID,
  getMapOfPinsByID,
  createNewMap,
  deleteMap,
  editMap
};
