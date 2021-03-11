// populates side bar with info from pin drops.

const Arr = [];
let i = 0;
let markerGroup = L.featureGroup([]);
markerGroup.addTo(mymap);

let editPopup = L.popup({
  editable: true,
  removable:true,
  nametag: `newPin${1}`

}).setContent('delBtn', 'place holder for custom html elment');


const onMapClickAddMarker = function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  Arr.push([lat, lng]);
  // console.log('Arr is now', Arr);
  markerGroup.addLayer(marker = L.marker([lat, lng]).addTo(mymap)
    .bindPopup(editPopup)

  );
  const appendField = `
      <div class="card border-dark mt-3 mb-1 create-card" id="pin-${i}">
        <div>
          <label for="pin-title">Name:</label>
          <input type="text" name="pins[${i}][pin-title]" required>
        </div>
        <div>
          <label for="pin-latitude">Latitude:</label>
          <input type="text" name="pins[${i}][pin-latitude]" value=${lat} readonly>
        </div>
        <div>
          <label for="pin-longitude">Longitude:</label>
          <input type="text" name="pins[${i}][pin-longitude]" value=${lng} readonly>
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
  $(document).on("removeMarker", function() {
    console.log('i heard the remove event');
  });
  // console.log('inside', i);

};

mymap.on('click', onMapClickAddMarker);

document.addEventListener("removeMarker", (e) => {
  console.log(e);
});
