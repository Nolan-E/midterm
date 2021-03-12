/* eslint-disable no-undef */
// let detailPopup = L.popup({
//   eiditable: true,
//   removable: true
// }).setContent(
//   `<div class="card border-primary mb-2 pin-pop">
//    <img src =https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60 class="card-img-top">
//    <div class="card-body text-primary">
//    <h5 class="card-title">${pin.pin_title}</h5>
//    <small id="map-author-rating">
//      <p class="card-text">Rating: ${pin.review}/5</p>
//      <p class="card-text">${pin.pin_description}</p>
//    </small>
//    </div>
//   `);

$(document).ready(function() {

  // Render pins when a map card is clicked.
  $(document).on('click', '.map-card', function() {
    let id = this.id
    $.get(`/api/maps/${id}`)
      .then(maps => {
        markerGroup.clearLayers();
        let marker;
        for (const pin of maps) {
          marker = new L.Marker([pin.pin_lat, pin.pin_lng]).bindPopup(
            `<div class="card border-primary mb-2 pin-pop">
            <img src="https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60 class="card-img-top">
            <div class="card-body text-primary">
            <h5 class="card-title">${pin.pin_title}</h5>
            <small id="map-author-rating">
              <p class="card-text">Rating: ${pin.review}/5</p>
              <p class="card-text">${pin.pin_description}</p>
            </small>
            </div>
           `,{
              removable: true,
              editable: false,
              nametag: `${pin.pin_title}`
            });
          markerGroup.addLayer(marker);
          marker = null;
        }
        markerGroup.addTo(mymap);
        mymap.fitBounds(markerGroup.getBounds());
        // console.log('render these:',maps);
      });
  });

  // Centers the view on a single pin when a pin-card is clicked.
  $(document).on('click', '.pin-card', function() {
    let id = Number(this.id);
    console.log('this id');
    $.get(`/api/pins/${id}`)
      .then(pins => {
        // markerGroup.clearLayers();
        console.log('the pins returned are: ', pins)
        let marker;
        for (const pin of pins) {
          if (pin.pin_id === id) {
            marker = new L.Marker([pin.pin_lat, pin.pin_lng]).bindPopup(
              `<div class="card border-primary mb-2 pin-pop">
              <img src="https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3N8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60 class="card-img-top">
              <div class="card-body text-primary">
              <h5 class="card-title">${pin.pin_title}</h5>
              <small id="map-author-rating">
                <p class="card-text">Rating: ${pin.review}/5</p>
                <p class="card-text">${pin.pin_description}</p>
              </small>
              </div>
             `,{
                removable: true,
                editable: false,
                nametag: `${pin.pin_title}`
              });
              mymap.panTo([pin.pin_lat, pin.pin_lng]);
            markerGroup.addLayer(marker);
            marker = null;
            }
          }
        markerGroup.addTo(mymap);
      });
  });
});
