const axios = require('axios');

const getLocation = () => {
  axios.get('https://api.ipify.org?format=json')
  .then(response => response.data.ip)
  .then(data => {
    const location = `https://freegeoip.app/json/${data}`;
    axios.get(location)
      .then(loc => {
        const locDataLat = loc.data.latitude;
        const locDataLng = loc.data.longitude;
        return {Lat: locDataLng, Lng: locDataLng};
      })
  });
};

module.exports = getLocation();
