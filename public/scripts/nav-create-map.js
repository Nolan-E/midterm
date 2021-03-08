// Helper Function
// function chunkArray(myArray, chunk_size){
//   const results = [];
//   while (myArray.length) {
//       results.push(myArray.splice(0, chunk_size));
//   }
//   return results;
// };

function chunkArray(myArray, chunk_size){
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
    $("#map-info-area").empty()
    const createMapCard = `
      <div class="card border-dark mt-0 mb-1">
        <div class="card-header bg-transparent border-dark">Create a new map</div>
        <div class="card-body text-dark">
          <p class="mb-3">Select an spot on the map to drop your markers.</p>
          <form id="form-create-map" action="">
            <div id="form-container">
            </div>

            <input id="button-create-map" type="submit" value="Create!">
          </form>

        </div>
      </div>
    `
    $("#map-info-area").append(createMapCard)
  })


  $(document).on("submit", "#form-create-map", function(event) {
    event.preventDefault()

    // Create dummy array with data from form
    const formDataAsArray = [];
    $.each($('form').serializeArray(), function() {
      formDataAsArray.push(this.value)
    });

    // Converts above to an array of objects. Each object is a pin.
    const output = chunkArray(formDataAsArray, 4);
    console.log(output);



  })
});
