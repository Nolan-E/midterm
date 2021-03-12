// populates side bar with info from pin drops.

const Arr = [];
let i = 0;
let markerGroup = L.featureGroup([]);

let editPopup = L.popup({
  editable: false,
  removable:true,

}).setContent('Navigate to create map to save pins');

let newMarker;
const onMapClickAddMarker = function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  Arr.push([lat, lng]);
  // console.log('Arr is now', Arr);

  newMarker = new L.Marker([lat, lng]).addTo(mymap).bindPopup(editPopup);
  markerGroup.addLayer(newMarker);
  newMarker = null;

  const appendField = `
  <div class="card border-dark mt-3 mb-1 p-2 create-card" id="pin${lat}">
  <div>
  <input type="text" name="pins[${i}][pin-title]" placeholder="Pin Name"required>
  </div>
  <div>
  <input type="text" name="pins[${i}][pin-description]" placeholder="Description" required>
  </div>
  <div>

  <div class="input-group-prepend">
  <div class="input-group-text">lat:</div>
  <input class="form-control font-weight-light text-sm" type="text" name="pins[${i}][pin-latitude]" value=${lat} readonly>
  </div>
  <div class="form-group">
  <div class="input-group-prepend">
  <div class="input-group-text input-sm">lon:</div>
  <input class="form-control font-weight-light text-sm input-sm" type="text" name="pins[${i}][pin-longitude]" value=${lng} readonly>
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
  $.when($("#" + mapCard)).done(function(e) {
    console.log(mapCard);
    e.remove("#" + mapCard);
  });

});
document.addEventListener("removeMarker", (e) => {


  console.log(e.detail.marker._latlng.lng);
  console.log(e.detail.marker._latlng.lat);
});

markerGroup.addTo(mymap);
