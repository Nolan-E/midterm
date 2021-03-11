$(document).ready(function() {
  $(document).on('click', '.card:not(.create-card)', function() {
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

});
