const showMyMaps = () => {
  console.log('###CLICKED###')
  $("#map-info-area").empty()
  $.get("api/maps/mymaps")
    .then(maps => {
      console.log('Received the following data from get /mymaps:', maps)
      $("#map-info-area").append("<h1>My Maps</h1>");
      for (const map of maps) {
          let ratingStr = '';
          if (map.rating) {
            ratingStr = `Rating: ${map.rating}`;
          } else {
            ratingStr = `No rating`
          }
          const createMapCard = `
          <div class="card border-primary mb-2" id=${map.map_id}>
          <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class= "card-img-top">
            <div class="card-header">Map by: ${map.created_by}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${map.map_name}</h5>
              <small id="map-author-rating">
                <p class="card-text">${ratingStr}</p>
                <p class="card-text">${map.map_created}</p>
              </small>
            </div>
          </div>
          `;
          $("#map-info-area").append(createMapCard);
      }
    })
    .catch(error => {
      $("#map-info-area").append(error.responseText);
    })
};


$(document).ready(function() {
  $("#nav-my-maps").on("click", showMyMaps);
});
