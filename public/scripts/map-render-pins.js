$(document).ready(function() {

  // Render pins when a map card is clicked.
  $(document).on('click', '.map-card', function() {
      let id = this.id
      console.log('clicked this:',id);
      $.get(`/api/maps/${id}`)
      .then(maps => {
        markerGroup.clearLayers();
        for(const pin of maps){
          markerGroup.addLayer(marker = L.marker([pin.pin_lat, pin.pin_lng]).addTo(mymap)
          .bindPopup(editPopup));
        }
        markerGroup.addTo(mymap);
        mymap.fitBounds(markerGroup.getBounds());
        console.log('redender these:',maps)
      });
    });

  // Centers the view on a single pin when a pin-card is clicked.
  $(document).on('click', '.pin-card', function() {
    let id = Number(this.id);
    $.get(`/api/pins/${id}`)
    .then(pins => {
      // markerGroup.clearLayers();
      console.log('the pins returned are: ', pins)
      for(const pin of pins){
        if (pin.pin_id === id) {
          console.log('check passed')
          // console.log('this pins details are', pin)

          markerGroup.addLayer(marker = L.marker([pin.pin_lat, pin.pin_lng]).addTo(mymap)
          .bindPopup(editPopup));
          markerGroup.addTo(mymap);
          mymap.fitBounds(markerGroup.getBounds());
        }
      }
    });
  });
});
