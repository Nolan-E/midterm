const db = require('../../server');

// Gets a list of all available maps
const getAllMapsAnon = () => {
  return db.query(`
    SELECT maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by
    FROM maps
    JOIN users ON maps.user_id = users.id
    ORDER BY map_created DESC;`
  )
  .then(response => response.rows)
  .catch(err => null);
};
// Gets a list of all maps by creator
const getAllMapsByUser = (userName) => {
  return db.query(`
    SELECT maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by
    FROM maps
    JOIN users ON maps.user_id = users.id
    WHERE users.name = $1
    ORDER BY map_created DESC;`, [userName]
  )
  .then(response => response.rows)
  .catch(err => null);
};
// Gets a map by map_id
const getMapsByID = (mapID) => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by
    FROM maps
    JOIN users ON maps.user_id = users.id
    WHERE maps.id = $1;`, [mapID]
  )
  .then(response => response.rows)
  .catch(err => null);
};
// Gets a specific map of pins by map_id
const getMapOfPinsByID = (mapID) => {
  return db.query(`
    SELECT maps.id AS map_id, maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by,
    pins.id AS pin_id, pins.lat AS pin_lat, pins.lng AS pin_lng, pins.title AS pin_title, pins.description AS pin_description
    FROM maps
    JOIN users ON maps.user_id = users.id
    JOIN pins ON maps.id = pins.map_id
    WHERE maps.id = $1
    ORDER BY pin_id;`, [mapID]
  )
  .then(response => response.rows)
  .catch(err => null);
};

//EXPORT FUNCTIONS
module.exports = {
  getAllMapsAnon,
  getAllMapsByUser,
  getMapsByID,
  getMapOfPinsByID
};
