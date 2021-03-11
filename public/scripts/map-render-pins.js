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
        for(const pin of pins){
          if (pin.pin_id === id) {
            console.log('check passed')
            console.log('Now need to figure out how to center map on this pin. map-render-pins file')
            // mymap.setView([pin.pin_lng, pin.pin_lat])
            // L.map('mapid').setView([pin.pin_lng, pin.pin_lat])
            // markerGroup.setView([pin.pin_lat, pin.pin_lng], 13)
          }

          // markerGroup.addLayer(marker = L.marker([pin.pin_lat, pin.pin_lng]).addTo(mymap)
          // .bindPopup(editPopup));
        }
        // markerGroup.addTo(mymap);
        // mymap.fitBounds(markerGroup.getBounds());
        // console.log('redender these:',maps)
      });
    });

});
