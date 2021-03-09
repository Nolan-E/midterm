const db = require('../../server');

// Create a pin & add it to a map
const createPin = (mapID, pin) => {
  const lat = Number(pin.pinLat);
  const lng = Number(pin.pinLng);
  return db.query(`
    INSERT INTO pins (map_id, lat, lng, title, description)
    VALUES ($1, $2, $3, $4, $5);`, [mapID, lat, lng, pin.pinName, pin.pinDesc]
  )
  .then(response => response.rows[0])
  .catch(err => null);
};

// Loop through geoJSON of many pins
const manyPins = (mapID, pins) => {
  for (const elem of pins) {
    createPin(mapID, elem);
  }
};

//EXPORT FUNCTIONS
module.exports = {
  createPin,
  manyPins
};
