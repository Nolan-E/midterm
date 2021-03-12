const showExploreMaps = () => {
  $("#map-info-area").empty();
  $.get("api/maps")
    .then(maps => {
      $("#map-info-area").append("<h1>Explore Maps</h1>");
      for (const map of maps) {
        let ratingStr = '';
        if (map.rating) {
          ratingStr = `Rating: ${map.rating}`;
        } else {
          ratingStr = `No rating`;
        }
        const createMapCard = `
          <div class="card mb-2 map-card p-2" id=${map.map_id}>
          <div class="imgContainer card-img-top d-flex align-items-center-center">
          <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class=" card-img-top mx-auto d-block">
          </div>
            <div class="card-header text-small p-1">Map By: ${map.created_by}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${map.map_name}</h5>
              <small id="map-author-rating">
              <p class="card-text">${ratingStr}</p>
              <p class="card-text">${map.map_created}</p>
              </small>
              <div class="d-flex flex-row justify-content-between">
                <form class="add-to-favorites">
                  <input type="hidden" name="map_id" value="${map.map_id}">
                  <button type="submit" class="btn btn-outline-primary"><i class="bi bi-suit-heart"></i></button>
                </form>
                <form class="form-map-name">
                  <input type="hidden" name="map_id" value="${map.map_id}">
                  <button type="submit" class="btn btn-outline-primary"><i class="bi bi-info"></i></button>
                </form>
              </div>
            </div>
          </div>
          `;
        $("#map-info-area").append(createMapCard);
      }
    });
};

$(document).ready(function() {
  $("#nav-explore-maps").on("click", function() {
    markerGroup.clearLayers();
    showExploreMaps();

  });

  $(document).on("submit", ".add-to-favorites", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    $.post("api/maps/addtofavorites", {mapId})
      .then((data) => {
        console.log("Added to favorites!");
        console.log('The following entry has been added into the fav_maps table: ', data);
      })
      .catch(error => {
        alert(error.responseText);
      });
  });
});
