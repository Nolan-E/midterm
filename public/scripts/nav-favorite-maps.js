const showFavoriteMaps = () => {
  $("#map-info-area").empty()
  $.get("api/maps/favorites")
    .then(maps => {
      console.log('Retrieved data is', maps)
      $("#map-info-area").append("<h1>Favorite Maps</h1>");
      for (const map of maps) {
        let ratingStr = '';
        if (map.rating) {
          ratingStr = `Rating: ${map.rating}`;
        } else {
          ratingStr = `No rating`
        }
        const createMapCard = `
        <div class="card border-primary map-card" id=${map.map_id}>
        <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class= "card-img-top">
          <div class="card-header">Map by: ${map.created_by}</div>
          <div class="card-body text-primary">
            <form class="form-map-name">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button type="submit">${map.map_name} (Click to see more details)</button>
            </form>
            <form class="form-see-reviews">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button type="submit">See Reviews</button>
            </form>
            <form class="form-delete-map">
              <input type="hidden" name="map_id" value="${map.map_id}">
              <button type="submit">Remove Map From Favorites</button>
            </form>

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
  // console.log('details are', details)
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


  $.get(`http://localhost:8080/api/maps/${details.map_id}/pins`)
    .then(pins => {
      for (const pin of pins) {
        const pinInformation = `
          <div class="card border-dark mb-1 pin-card" id=${pin.id}>
            <div class="card-body text-dark">
              <h5 class="card-title">pin.title ${pin.title}</h5>
            </div>
            <form class="form-edit-map">
            <div class="form-group mb-2 form-inline">
              <label for="pin.title">pin.title</label>
              <input class="form-control" type="text" name="pin.title" placeholder="pin.title" value=${pin.title}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.lat">pin.lat</label>
              <input class="form-control" type="number" name="pin.lat" placeholder="pin.lat" value=${pin.lat}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.lng">pin.lng</label>
              <input class="form-control" type="number" name="pin.lng" placeholder="pin.lng" value=${pin.lng}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.image_url">pin.image_url</label>
              <input class="form-control" type="text" name="pin.image_url" placeholder="pin.image_url" value=${pin.image_url}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.description">pin.description</label>
              <input class="form-control" type="text" name="pin.description" placeholder="pin.description" value=${pin.description}>
            </div>
              <input type="hidden" name="pin_id" value="${pin.id}">
              <input type="hidden" name="map_id" value="${pin.map_id}">
              <button type="submit">Update Pin</button>
            </form>

            <form class="form-delete-pin">
              <input type="hidden" name="pinId" value="${pin.id}">
              <input type="hidden" name="mapId" value="${details.map_id}">
              <button type="submit">Delete Pin</button>
            </form>
          </div>
        `;
        $("#map-info-area").append(pinInformation);
      }
    })
};

$(document).ready(function() {
  $("#nav-favorite-maps").on("click", showFavoriteMaps);

  $(document).on("submit", ".form-map-name", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    console.log('the mapid is', mapId)
    $.get(`http://localhost:8080/api/maps/${mapId}`)
      .then(mapDetails => {
        console.log('This map has the following details:', mapDetails);
        showMapDetails(mapDetails[0]);
      })
      .catch(error => console.log(error));
  })

  $(document).on("submit", ".form-see-reviews", function(event) {
    event.preventDefault();
    const pinId = Number($(this).serializeArray()[0].value);
    console.log(pinId);
    $.get(`api/pins/${pinId}`)
      .then(pinDetails => {
        console.log('pinDetails are', pinDetails);
        showReviews(pinDetails)
      })
  })

  $(document).on("submit", ".form-delete-map", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    $.post(`http://localhost:8080/api/maps/${mapId}/delete`, {mapId})
      .then((data) => {
        console.log('Delete Map > Then > Received data is:', data)
        showFavoriteMaps();
      })
      .catch(error => console.log(error));
  })

  $(document).on("submit", ".form-delete-pin", function(event) {
    event.stopPropagation();
    event.preventDefault();
    const pinId = Number($(this).serializeArray()[0].value);
    const mapId = Number($(this).serializeArray()[1].value);

    $.post("api/users/myuserid", {pinId, mapId})
      .then(response => {
        console.log('the resultof posting to myuserid is', response)

        if (response === 'authorized') {
          $.post(`http://localhost:8080/api/pins/${pinId}/delete`, {pinId})
            .then(response => {
              console.log('after post, the response received is', response);
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => {
        return alert(`${error.status}: ${error.responseText}`);
      })
    });

  $(document).on("submit", ".form-edit-map", function(event) {
    event.preventDefault();
    const formDataAsArray = [];
    $.each($(this).serializeArray(), function() {
      formDataAsArray.push(this.value);
    });
    console.log('formDataAsArray', formDataAsArray)
    const pinId = formDataAsArray[5]
    const mapId = formDataAsArray[6];
    const pinUpdateObj = {
      title: formDataAsArray[0],
      lat: formDataAsArray[1],
      lng: formDataAsArray[2],
      image_url: formDataAsArray[3],
      description: formDataAsArray[4],
      pinId,
      mapId
    };

    $.post(`api/pins/${pinId}/edit`, pinUpdateObj)
      .then(response => {
        showMyMaps();
        alert(response);
      })
      .catch(error => alert(error));
  });


});
