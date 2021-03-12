const showMyMaps = () => {
  $("#map-info-area").empty();
  $.get("api/maps/mymaps")
    .then(maps => {
      $("#map-info-area").append("<h1>My Maps</h1>");
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
          <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class= "card-img-top mx-auto d-block">
          </div>
            <div class="card-header">Map By: ${map.created_by}</div>
            <div class="card-body text-primary">
              <h5 class="card-title">${map.map_name}</h5>
              <small id="map-author-rating">
              <p class="card-text">${ratingStr}</p>
              <p class="card-text">${map.map_created}</p>
              </small>
            </div>
            <div class="d-flex flex-row justify-content-between">
                <form class="form-map-name">
                  <input type="hidden" name="map_id" value="${map.map_id}">
                  <button type="submit" class="btn btn-outline-primary"><i class="bi bi-info"></i></button>
                </form>
                <form class="form-delete-map">
                  <input type="hidden" name="map_id" value="${map.map_id}">
                  <button type="submit" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                </form>
            </div>
          `;
        $("#map-info-area").append(createMapCard);
      }
    })
    .catch(error => {
      $("#map-info-area").append(error.responseText);
    });
};


$(document).ready(function() {
  $("#nav-my-maps").on("click", showMyMaps);

  $(document).on("submit", ".form-delete-map", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    console.log('mapId', mapId);
    $.post(`http://localhost:8080/api/maps/${mapId}/delete`, {mapId})
      .then((data) => {
        console.log('Delete Map > Then > Received data is:', data);
        showMyMaps();
      })
      .catch(error => console.log(error));
  });
});
