// populates side bar with info from pin drops.

const Arr = [];
let i = 0;
let markerGroup = L.featureGroup([]);
markerGroup.addTo(mymap);

function onMapClickAddMarker(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    Arr.push([lat, lng])
    // console.log('Arr is now', Arr);
    markerGroup.addLayer(marker = L.marker([lat, lng]).addTo(mymap)
    //  .bindTooltip('click me to edit')
    .bindPopup(editPopup)
    //  .on('popupopen', function() {
      //   this.openPopup();
      //  })
      );
    const appendField = `
      <div class="card border-dark mt-3 mb-1">
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

    $("#form-container").append(appendField)
    $("#form-container").append("<br>")
    i ++;
    // console.log('inside', i);

}

mymap.on('click', onMapClickAddMarker);
