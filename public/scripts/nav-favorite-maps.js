const showFavoriteMaps = () => {
  $("#map-info-area").empty()
  $.get("http://localhost:8080/api/maps/favorites")
    .then(maps => {
      console.log(maps)
      for (const map of maps) {
        const createMapCard = `
        <div class="card border-primary mb-2">
          <div class="card-header">${map.created_by}</div>
          <div class="card-body text-primary">
            <h5 class="card-title">${map.map_name}</h5>
            <small id="map-author-rating">
              <p class="card-text">Rating: ${map.rating}/5</p>
              <p class="card-text">${map.map_created}</p>
            </small>
          </div>
        </div>
        `;
        $("#map-info-area").append(createMapCard);
      }
    })
};


$(document).ready(function() {
  $("#nav-favorite-maps").on("click", showFavoriteMaps);

});
