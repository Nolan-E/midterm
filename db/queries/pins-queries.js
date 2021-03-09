const db = require('../../server');

// Create a pin & add it to a map
const createPin = (mapID, pin) => {
    const pinProp = pin.properties;
    const pinGeo = pin.geometry;
    const lat = pinGeo.coordinates[1];
    const lng = pinGeo.coordinates[0];
    return db.query(`
      INSERT INTO pins (map_id, lat, lng, title, description)
      VALUES ($1, $2, $3, $4, $5);`, [mapID, lat, lng, pinProp.name, pinProp.description]
    )
      .then((response) => {
        return response.rows[0];
      });
};

// Loop through geoJSON of many pins
const manyPins = (mapID, geoJSON) => {
  for (const elem of geoJSON.features) {
    createPin(mapID, elem);
  }
};

//EXPORT FUNCTIONS
module.exports = {
  createPin,
  manyPins
};
