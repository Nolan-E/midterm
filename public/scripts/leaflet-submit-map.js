// populates side bar with info from pin drops.

const Arr = [];
let i = 0;
let markerGroup = L.featureGroup([]);
markerGroup.addTo(mymap);

let editPopup = L.popup({
  editable: true,
  removable:true,
  nametag: `${i}`

}).setContent('delBtn', 'place holder for custom html elment');


const onMapClickAddMarker = function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  Arr.push([lat, lng]);
  // console.log('Arr is now', Arr);
  markerGroup.addLayer(new L.marker([lat, lng]).addTo(mymap)
    .bindPopup(editPopup).update()

  );
  const appendField = `
      <div class="card border-dark mt-3 mb-1 create-card" id="pin${lat}">
        <div>
          <label for="pin-title">Name:</label>
          <input type="text" name="pins[${i}][pin-title]" required>
        </div>
        <div>
          <label for="pin-latitude">Latitude:</label>
          <input type="text" name="pins[${i}][pin-latitude]" value=${lat} hidden>
        </div>
        <div>
          <label for="pin-longitude">Longitude:</label>
          <input type="text" name="pins[${i}][pin-longitude]" value=${lng} hidden>
        </div>
        <div>
          <label for="pin-description">Description:</label>
          <input type="text" name="pins[${i}][pin-description]" required>
        </div>
      </div>
    `;

  $("#form-container").append(appendField);
  $("#form-container").append("<br>");
  i ++;
  // console.log('inside', i);

};

mymap.on('click', onMapClickAddMarker);
$(document).on("removeMarker", function(e) {
  let lat = e.detail.marker._latlng.lat;
  let lng = e.detail.marker._latlng.lng;
  let mapCard = `pin${lat}`;
  $("#form-container").contents().remove("#" + mapCard);
  console.log(mapCard);
});
document.addEventListener("removeMarker", (e) => {


  console.log(e.detail.marker._latlng.lng);
  console.log(e.detail.marker._latlng.lat);
});
