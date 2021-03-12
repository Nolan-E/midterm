const chunkArray = function(myArray, chunk_size) {
  const results = [];
  while (myArray.length) {
    const dummyObj = {
      "pinName": myArray[0],
      "pinLat": myArray[1],
      "pinLng": myArray[2],
      "pinDesc": myArray[3]
    };
    results.push(dummyObj);
    myArray.splice(0, chunk_size);
  }
  return results;
};


$(document).ready(function() {

  $("#nav-create-map").on("click", function() {
    markerGroup.clearLayers();
    $("#map-info-area").empty();

    $.get('api/maps/create')
      .then(() => {
        const createMapCard = `
        <h1>Map Creation</h1>

        <div class="card border-light mt-0 mb-1 create-card">
          <div class="card-header bg-transparent border-dark">Create a new map</div>
          <div class="card-body text-dark">
            <textarea name="text" id="newMapName" placeholder=" Title your map" required></textarea>
            <p class="mb-3">Select a spot on the map to drop a new pin.</p>
            <form id="form-create-map" action="">
              <div id="form-container">
              </div>
              <input id="button-create-map" type="submit" value="Create!" class="btn btn-outline-secondary">
            </form>

          </div>
        </div>
        `;
        $("#map-info-area").append(createMapCard);
      })
      .catch(error => {
        $("#map-info-area").append(error.responseText);
      });
  });


  $(document).on("submit", "#form-create-map", function(event) {
    event.preventDefault();

    const mapName = $("#newMapName").val();
    console.log('creating new map:', mapName);
    const formDataAsArray = [];
    $.each($('form').serializeArray(), function() {
      formDataAsArray.push(this.value);
    });

    const output = chunkArray(formDataAsArray, 4);
    console.log(output);
    $.ajax({
      url: "api/maps",
      method: "POST",
      data: {
        map:{
          name: mapName,
          pins: output
        }
      },
      dataType: "json"
    });
    setTimeout(function() {showMyMaps()}, 2000);
    alert('Map created.');
  });
});
