const showFavoriteMaps = () => {
  $("#map-info-area").empty()
  $.get("api/maps/favorites")
    .then(maps => {
      console.log('Retrieved data is', maps)
      $("#map-info-area").append("<h1>Favorite Maps</h1>");
      for (const map of maps) {
        const createMapCard = `
        <div class="card border-primary">

          <div class="card-header">Map by: ${map.created_by}</div>
          <div class="card-body text-primary">
            <form class="form-map-name">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button type="submit">${map.map_name}</button>
            </form>
            <form class="form-see-reviews">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button type="submit">See Reviews</button>
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

const showReviews = (reviews) => {
  console.log(reviews);
  $("#map-info-area").empty()
  $("#map-info-area").append("<h1>User Reviews</h1>");


  for (const review of reviews) {
    const createReviewCard = `
      <div class="card border-dark mb-1">
        <div class="card-header bg-transparent border-success">${review.pin_title}</div>
        <div class="card-body text-dark">
          <p class="card-text">Rating: ${review.stars}/5</p>
          <p class="card-text">${review.pin_review_msg}</p>
        </div>
        <div class="card-footer bg-transparent border-success text-muted">Review by: ${review.user_name} (${review.date_reviewed})</div>
      </div>
    `;

    $("#map-info-area").append(createReviewCard);
  }
};

const showMapDetails = (details) => {
  $("#map-info-area").empty();
  const mapInformation = `
    <div class="card border-primary mb-1">
      <div class="card-body text-primary">
        <h5 class="card-title">${details.map_name}</h5>
        <small>
          <p class="card-text mb-0">Map by ${details.created_by}</p>
          <p class="card-text mb-0">Average Rating 4.3/5 from 15 users</p>
          <p class="card-text mb-0">4 user reviews. Click to view</p>
        </small>
      </div>
    </div>
  `;
  $("#map-info-area").append(mapInformation);

  const pinInformation = `
    <div class="card border-dark mb-1">
      <div class="card-body text-dark">
        <h5 class="card-title">pin_title ${details.pin_title}</h5>
        <p>pin_id ${details.pin_id}</p>
        <p>pin_lat ${details.pin_lat}</p>
        <p>pin_lng ${details.pin_lng}</p>
        <p>pin_description ${details.pin_description}</p>
      </div>
    </div>
  `;
  $("#map-info-area").append(pinInformation);

};

$(document).ready(function() {
  $("#nav-favorite-maps").on("click", showFavoriteMaps);

  $(document).on("submit", ".form-map-name", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    $.get(`http://localhost:8080/api/maps/${mapId}`)
      .then(mapDetails => {
        console.log('mapdetails are', mapDetails[0]);
        showMapDetails(mapDetails[0]);
      })
  })


  $(document).on("submit", ".form-see-reviews", function(event) {
    event.preventDefault();
    const pinId = Number($(this).serializeArray()[0].value);
    console.log(pinId);
    $.get(`http://localhost:8080/api/parks/${pinId}`)
      .then(pinDetails => {
        console.log('pinDetails are', pinDetails);
        showReviews(pinDetails)
      })

  })
});
