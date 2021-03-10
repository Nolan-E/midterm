const showExploreMaps = () => {
  $("#map-info-area").empty()
    $.get("api/maps")
      .then(maps => {
        console.log(maps)
        $("#map-info-area").append("<h1>Explore Maps</h1>");
        for (const map of maps) {
          const createMapCard = `
          <div class="card border-primary mb-2">
            <div class="card-header">By ${map.created_by}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${map.map_name}</h5>
              <small id="map-author-rating">
                <p class="card-text">Rating: ${map.rating}/5</p>
                <p class="card-text">${map.map_created}</p>
              </small>
              <button class="add-to-favorites">Add to Favorites</button>
            </div>
          </div>
          `;
          $("#map-info-area").append(createMapCard);
        }
      })
};

$(document).ready(function() {
  $("#nav-explore-maps").on("click", showExploreMaps)

  $(document).on("click", ".add-to-favorites", function() {
    alert("Added to favorites!");
    $.post("http://localhost:8080/api/maps/addtofavorites")
      .then((data) => {
        console.log('inside then');
        console.log(data)
      })

  })
})
