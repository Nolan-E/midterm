const showExploreMaps = () => {
  $("#map-info-area").empty()
    $.get("api/maps")
      .then(maps => {
        console.log(maps)
        $("#map-info-area").append("<h1>Explore Maps</h1>");
        for (const map of maps) {
          let ratingStr = '';
          if (map.rating) {
            ratingStr = `Rating: ${map.rating}`;
          } else {
            ratingStr = `No rating`
          }
          const createMapCard = `
          <div class="card border-primary mb-2 map-card" id=${map.map_id}>
            <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class= "card-img-top">
            <div class="card-header">By ${map.created_by}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${map.map_name}</h5>
              <small id="map-author-rating">
                <p class="card-text">${ratingStr}</p>
                <p class="card-text">${map.map_created}</p>
              </small>
              <form class="add-to-favorites">
                <input type="hidden" name="map_id" value="${map.map_id}">
                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
              </svg></button>
              </form>

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
        console.log('The following entry has been added into the fav_maps table: ', data)
      })
      .catch(error => {
        alert(error.responseText);
      });
  })
})
