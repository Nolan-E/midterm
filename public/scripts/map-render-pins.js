$(document).ready(function() {
  $(document).on('click', '.card', function() {
      let id = this.id
      console.log('clicked this:',id);
      markerGroup.clearLayers();
    $.get(`/api/maps/${id}`)
    .then(maps => {
        for(const pin of maps){
          markerGroup.addLayer(marker = L.marker([pin.pin_lat, pin.pin_lng]).addTo(mymap)
          .bindPopup(editPopup));
        }
        markerGroup.addTo(mymap);
        mymap.fitBounds(markerGroup.getBounds());
        console.log('redender these:',maps)
      });
    });

});
