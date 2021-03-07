const axios = require('axios');

const userLoc = () => {
  axios.get('https://api.ipify.org?format=json')
  .then(response => response.data.ip)
  .then(data => {
    const location = `https://freegeoip.app/json/${data}`;
    axios.get(location)
      .then(loc => {
        const locDataLat = loc.data.latitude;
        const locDataLng = loc.data.longitude;
        console.log('locDataLat: ', locDataLat)
        console.log('locDataLng: ', locDataLng)
        return {lat: locDataLat, lng: locDataLng};
        // res.render("index");
      })
  })
};

module.exports = userLoc;
