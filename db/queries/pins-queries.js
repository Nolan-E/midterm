const db = require('../../server');

// Create a pin & add it to a map
const createPin = (mapID, pin) => {
  const lat = Number(pin.pinLat);
  const lng = Number(pin.pinLng);
  const queryParams = [mapID, lat, lng, pin.pinName, pin.pinDesc];
  let queryString =
   `INSERT INTO pins (map_id, lat, lng, title, description, active, image_url)
    VALUES ($1, $2, $3, $4, $5, default`;
    if (pin.imgURL === undefined || !pin.imgURL.trim()) {
      queryString += `, default) RETURNING *;`;
    } else {
      queryString += `, $6) RETURNING *;`;
      queryParams.push(pin.imgURL.trim());
    }
  return db.query(queryString, queryParams)
    .then(response => response.rows[0])
    .catch(err => err);
};
// Loop through geoJSON of many pins
const manyPins = (mapID, pins) => {
  for (const elem of pins) {
    createPin(mapID, elem);
  }
};
// Delete single pin
const deletePin = (userID, pinID) => {
  return db.query(`
    UPDATE pins
    SET active = false
    FROM maps
    JOIN users ON users.id = user_id
    WHERE maps.id = map_id AND user_id = $1 AND pins.id = $2 RETURNING pins.*;`, [userID, pinID]
  )
    .then(response => response.rows[0])
    .catch(err => err)
};
// Edit single pin
const editPin = (userID, pinID, pinObj) => {
  return db.query(`
    UPDATE pins
    SET lat = $3, lng = $4, title = $5, description = $6, image_url = $7
    FROM maps
    JOIN users ON users.id = user_id
    WHERE maps.id = map_id AND user_id = $1 AND pins.id = $2
    RETURNING pins.*;`, [userID, pinID, pinObj.lat, pinObj.lng, pinObj.title, pinObj.description, pinObj.image_url]
  )
    .then(response => response.rows[0])
    .catch(err => err)
};

const getPinsByMapID = (mapID) => {
  return db.query(`
    SELECT *
    FROM pins
    WHERE map_id = $1
    ORDER BY lat;`, [mapID]
  )
    .then(response => response.rows)
    .catch(err => err)
};

//EXPORT FUNCTIONS
module.exports = {
  createPin,
  manyPins,
  deletePin,
  editPin,
  getPinsByMapID
};
