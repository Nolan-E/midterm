const showFavoriteMaps = function() {
  $("#map-info-area").empty();
  $.get("api/maps/favorites")
    .then(maps => {
      console.log('Retrieved data is', maps);
      $("#map-info-area").append("<h1>Favorite Maps</h1>");
      for (const map of maps) {
        let ratingStr = '';
        if (map.rating) {
          ratingStr = `Rating: ${map.rating}`;
        } else {
          ratingStr = `No rating`;
        }
        const createMapCard = `
        <div class="card map-card p-1" id=${map.map_id}>
        <div class="imgContainer card-img-top">
        <img id="cardimg" src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" class= "mx-auto">
        </div>
          <div class="card-header p-1">Map by: ${map.created_by}</div>
          <div class="card-body text-primary">
          <h5 class="card-title">${map.map_name}</h5>
          <form class="form-see-reviews">
            <input type="hidden" name="map_id" value="${map.map_id}">
            <button type="submit"class="btn btn-sm btn-outline-secondary">See Reviews</button>
          </form>
          <small id="map-author-rating">
          <p class="card-text">Rating: ${map.rating}/5</p>
          <p class="card-text">${map.map_created}</p>
          </small>
          <div class="d-flex justify-content-between">
          <form class="form-map-name">
            <input type="hidden" name="map_id" value="${map.map_id}">
            <button type="submit" class="btn btn-outline-primary"><i class="bi bi-info"></i></button>
          </form>
          <form class="form-delete-favorite">
            <input type="hidden" name="map_id" value="${map.map_id}">
            <button type="submit" class="btn btn-outline-danger"><i class="bi bi-trash"></i>Favorite</button>
          </form>
          </div>
          </div>
        </div>
        `;
        $("#map-info-area").append(createMapCard);
      }
    })
    .catch(error => {
      $("#map-info-area").append(error.responseText);
    });
};

const showReviews = (reviews) => {
  // console.log(reviews);
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
        <form class="form-add-pin d-flex justify-content-end">
          <input type="hidden" name="map_id" value="${details.map_id}">
          <button type="submit" class="btn btn-outline-primary"><i class="bi bi-geo"></i></button>
        </form>
      </div>
    </div>
  `;
  $("#map-info-area").append(mapInformation);


  $.get(`http://localhost:8080/api/maps/${details.map_id}/pins`)
    .then(pins => {
      for (const pin of pins) {
        const pinInformation = `
          <div class="card mb-1 pin-card" id=${pin.id}>
            <div class="card-body text-dark">
              <h5 class="card-title text-primary">${pin.title}</h5>
            </div>
            <form class="form-edit-map">
            <div class="form-group mb-2 form-inline">
              <label for="pin.title">Name</label>
              <input class="form-control" type="text" name="pin.title" placeholder="pin.title" value=${pin.title}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.lat">Latitude</label>
              <input class="form-control" type="number" name="pin.lat" placeholder="pin.lat" value=${pin.lat}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.lng">Longitude</label>
              <input class="form-control" type="number" name="pin.lng" placeholder="pin.lng" value=${pin.lng}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.image_url">Image URL</label>
              <input class="form-control" type="text" name="pin.image_url" placeholder="pin.image_url" value=${pin.image_url}>
            </div>
            <div class="form-group mb-2 form-inline">
              <label for="pin.description">Description</label>
              <input class="form-control" type="text" name="pin.description" placeholder="pin.description" value=${pin.description}>
            </div>
              <div class="d-flex flex-row-reverse justify-content-between m-2">
              <input type="hidden" name="pin_id" value="${pin.id}">
              <input type="hidden" name="map_id" value="${pin.map_id}">
              <button type="submit"class="btn btn-outline-primary">Update Pin</button>
            </form>
            <form class="form-delete-pin">
              <input type="hidden" name="pinId" value="${pin.id}">
              <input type="hidden" name="mapId" value="${details.map_id}">
              <button type="submit" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
            </form>
            </div>
          </div>
        `;
        $("#map-info-area").append(pinInformation);
      }
    });
};

$(document).ready(function() {
  $("#nav-favorite-maps").on("click", showFavoriteMaps);

  $(document).on("submit", ".form-map-name", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    // console.log('the mapid is', mapId);

    // Refresh left bar to show map details
    $.get(`http://localhost:8080/api/maps/${mapId}`)
      .then(mapDetails => {
        // console.log('This map has the following details:', mapDetails);
        showMapDetails(mapDetails[0]);
      })
      .catch(error => console.log(error));
  });

  $(document).on("submit", ".form-see-reviews", function(event) {
    event.preventDefault();
    const pinId = Number($(this).serializeArray()[0].value);
    // console.log(pinId);
    $.get(`api/pins/${pinId}`)
      .then(pinDetails => {
        // console.log('pinDetails are', pinDetails);
        showReviews(pinDetails);
      });
  });

  $(document).on("submit", ".form-delete-favorite", function(event) {
    event.preventDefault();
    const mapId = Number($(this).serializeArray()[0].value);
    $.post(`http://localhost:8080/api/maps/${mapId}/deletefromfavorites`, {mapId})
      .then((data) => {
        // console.log('Delete Map > Then > Received data is:', data);
        showFavoriteMaps();
      })
      .catch(error => console.log(error));
  });

  $(document).on("submit", ".form-delete-pin", function(event) {
    event.stopPropagation();
    event.preventDefault();
    const pinId = Number($(this).serializeArray()[0].value);
    const mapId = Number($(this).serializeArray()[1].value);

    // check if the current user is the actual author. only author should be able to edit/delete
    $.post("api/users/myuserid", {pinId, mapId})
      .then(response => {
        // console.log('the resultof posting to myuserid is', response)

        if (response === 'authorized') {
          console.log('You own this map!');
          $.get(`http://localhost:8080/api/maps/${mapId}`)
            .then(response => {
              console.log('@@@@@@@', response);
              if (response.length !== 1) {

                $.post(`http://localhost:8080/api/pins/${pinId}/delete`, {pinId})
                  .then(() => {
                    // Refresh left bar to show map details
                    $.get(`http://localhost:8080/api/maps/${mapId}`)
                      .then(mapDetails => {
                        // console.log('This map has the following details:', mapDetails);
                        showMapDetails(mapDetails[0]);
                      });
                    // console.log('after post, the response received is', response);
                  })
                  .catch(error => console.log(error));

              } else {
                alert('This is the last pin on this map. Please delete the map instead to delete this pin.');
              }
            });
        }
      })
      .catch(error => {
        return alert(`${error.status}: ${error.responseText}`);
      });
  });

  $(document).on("submit", ".form-edit-map", function(event) {
    event.preventDefault();
    const formDataAsArray = [];
    $.each($(this).serializeArray(), function() {
      formDataAsArray.push(this.value);
    });
    // console.log('formDataAsArray', formDataAsArray)
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

    $.post("api/users/myuserid", {pinId, mapId})
      .then(response => {

        if (response === 'authorized') {
          $.post(`api/pins/${pinId}/edit`, pinUpdateObj)
            .then(response => {
              // Refresh left bar to show map details
              $.get(`http://localhost:8080/api/maps/${mapId}`)
                .then(mapDetails => {
                  // console.log('This map has the following details:', mapDetails);
                  showMapDetails(mapDetails[0]);
                })

              alert(response);
            })
            .catch(error => alert(error));
              }
      })
      .catch(error => {
        return alert(`${error.status}: ${error.responseText}`);
      })
  });

  $(document).on("submit", ".form-add-pin", function(event) {
    event.preventDefault();
    console.log("clicked on .form-add-pin")
    // console.log('the form gave me this', $(this).serializeArray())
    const mapId = Number($(this).serializeArray()[0].value);
    console.log('i got the map id, it is', mapId)
    const createMapCard = `
        <div class="card border-dark mt-0 mb-1 create-card">
          <div class="card-header bg-transparent border-dark">Add a new pin</div>
          <div class="card-body text-dark">
            <p class="mb-3">Select a spot on the map to drop a new pin.</p>
            <form id="form-submit-pins" action="">
              <div id="form-container">
              </div>
              <input type="hidden" name="map_id" value="${mapId}">
              <input id="button-add-pins" type="submit" value="Create!">
            </form>

          </div>
        </div>
        `;
        $("#map-info-area").prepend(createMapCard);
  })

  $(document).on("submit", "#form-submit-pins", function(event) {
    event.preventDefault();
    let arr = $(this).serializeArray()
    // console.log(arr);
    const mapId = arr.pop()['value'];

    const formDataAsArray = [];
    $.each(arr, function() {
      formDataAsArray.push(this.value);
    });

    const output = chunkArray(formDataAsArray, 4);
    // console.log('after chunkarray, my output looks like this: ', output);

    $.post(`api/maps/${mapId}/add`, {mapId, output})
      .then(response => {

        // Refresh left bar to show map details
        $.get(`http://localhost:8080/api/maps/${mapId}`)
        .then(mapDetails => {
          // console.log('This map has the following details:', mapDetails);
          showMapDetails(mapDetails[0]);
        })

        alert(response);
      })
  });
});
