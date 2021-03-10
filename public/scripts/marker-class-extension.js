// let MyMarkerGroup = L.FeatureGroup.extend({
//   // override the 'getLayerId' function to return your ids rather then leaflets internal ids
//   getLayerId: function(layer){
//     return layer.id;
//   }

//   getLayersById: function(arrayOfLayerIds){
//     var layers = [];
//     // some logic to loop over layers and select them by id
//     // leaflet maintains layers (markers) in an internal _layers property
//     for (let i = arrayOfLayerIds.length - 1; i >= 0; i--) {
//       let id = arrayOfLayerIds[i];
//       layers.push(this._layers[id]);
//     }
//     return layers;
//   }
// });

// let markers = new MyMarkerGroup();

// let marker = new L.marker(latlng, options);

// // marker.id = "something"; // assign your id

// // markers.addLayer(marker); // add your layer

// let aMarker = markers.getLayer("something"); // gets  marker by id
// let someMarkers = markers.getLayersById(["foo", "bar"]); // get markers by their ids
