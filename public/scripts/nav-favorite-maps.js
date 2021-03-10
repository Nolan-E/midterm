const showFavoriteMaps = () => {
  $("#map-info-area").empty()
  $.get("api/maps/favorites")
    .then(maps => {
      console.log(maps)
      $("#map-info-area").append("<h1>Favorite Maps</h1>");
      for (const map of maps) {
        const createMapCard = `
        <div class="card border-primary">

          <div class="card-header">${map.created_by}</div>
          <div class="card-body text-primary">
            <form class="form-map-name">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button class="button-map-name" type="submit">${map.map_name}</button>
              <h5 class="card-title">
                <a href="" type="submit">
                ${map.map_name}
                </a>
              </h5>
            </form>




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

  $(document).on("submit", ".form-map-name", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
  })

});
