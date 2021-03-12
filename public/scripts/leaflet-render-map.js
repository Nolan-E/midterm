// // [latitude, longitude, dog_park_title, dog_park_description]
// const queriedPins = [
//   [51.15049396880196, -114.19687271118165, 'Dog Park A', 'description aa'],
//   [51.147801909622714, -114.17850494384767, 'Dog Park B', 'description bb'],
//   [51.13649354621719, -114.17678833007814, 'Dog Park C', 'description cc'],
//   [51.12895309822599, -114.19292449951173, 'Dog Park D', 'description dd'],
//   [51.131538533389175, -114.22416687011719, 'Dog Park E', 'description ee'],
//   [51.14112492521663, -114.23343658447267, 'Dog Park F', 'description ff'],
//   [51.1509246836981, -114.22073364257814, 'Dog Park G', 'description gg']
// ];

// const home = [51.1391, -114.2002];
let mymap = L.map('mapid').setView([51.049999, -114.066666], 11);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=KSgZl5R174SBURmzIIyg', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(mymap);

// const data_points = {
//   "type": "FeatureCollection",
//   "name": "test-points-short-named",
//   "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
//   "features": []
// };

// for (const queriedPin of queriedPins) {
//   const pinGeoJSON = {
//     "type": "Feature",
//     "properties": { "name": `${queriedPin[2]}`, "description": `${queriedPin[3]}` },
//     "geometry": { "type": "Point", "coordinates": [ queriedPin[1], queriedPin[0] ] }
//   };
//   data_points['features'].push(pinGeoJSON);
// }

// const pointLayer = L.geoJSON(null, {
//   pointToLayer: function(feature, latlng) {
//     const label = String(feature.properties.name);
//     const description = String(feature.properties.description);
//     L.marker(latlng)
//       // .bindTooltip(label, {permanent: true, opacity: 0.7})
//       // .openTooltip()
//       marker.bindPopup(`<b>${label}</b><br>${description}`)
//       .on('mouseover', function(e) {
//         this.openPopup();
//       })
//       .on('mouseout', function(e) {
//         this.closePopup();
//       });
//   }
// });
//pointLayer.addData(data_points);
$(document).ready(function() {
// Centers the view on a single pin when a pin-card is clicked.
  $(document).on('click', '.pin-card', function() {
    let id = Number(this.id);
    $.get(`/api/pins/${id}`)
      .then(pins => {
        //markerGroup.clearLayers();
        let marker;
        for (const pin of pins) {
          if (pin.pin_id === id) {
            marker = new L.Marker([pin.pin_lat, pin.pin_lng]).bindPopup(
              `<div class="card border-primary mb-2 pin-pop">
              <img src="https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60 class="card-img-top">
              <div class="card-body text-primary">
              <h5 class="card-title">${pin.pin_title}</h5>
              <small id="map-author-rating">
                <p class="card-text">Rating: ${pin.review}/5</p>
                <p class="card-text">${pin.pin_description}</p>
              </small>
              </div>
            `,{
                removable: true,
                editable: false,
                nametag: `${pin.pin_title}`
              });
              console.log(marker);
            markerGroup.addLayer(marker);
            marker = null;
          }
        }
        markerGroup.addTo(mymap);
        mymap.fitBounds(markerGroup.getBounds());
      });
  });

});
