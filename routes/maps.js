const express = require('express');
const router  = express.Router();
const {
  getAllMapsAnon,
  getAvgRatingForMap,
  getTopRated,
  getAllMapsByUser,
  getMapsByID,
  getMapOfPinsByID,
  createNewMap,
  deleteMap,
  editMap
} = require('../db/queries/maps-queries');
const {
  getAllFavMaps,
  addToMyFav
} = require('../db/queries/fav-maps-queries');
const {createPin,
  manyPins,
  getPinsByMapID
} = require('../db/queries/pins-queries.js');
const {deleteMyFav} = require('../db/queries/fav-maps-queries');
const {isLoggedIn} = require('../public/scripts/middleware');

//dumy data
// const dataPoints = {
//   "type": "FeatureCollection",
//   "name": "test-points-short-named",
//   "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
//   "features": [
//     { "type": "Feature",
//       "properties": {
//         "name": "Dog Park A",
//         "description": "AAA"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [ -114.19687271118165, 51.15049396880196 ]
//       } },
//     { "type": "Feature",
//       "properties": {
//         "name": "Dog Park B",
//         "description": "BBB"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [ -114.17850494384767, 51.147801909622714 ]
//       } },
//     { "type": "Feature",
//       "properties": {
//         "name": "Dog Park C", "description": "CCC"
//       },
//       "geometry":
//       { "type": "Point",
//         "coordinates": [ -114.17678833007814, 51.13649354621719 ]
//       } },
//     { "type": "Feature",
//       "properties": {
//         "name": "Dog Park D",
//         "description": "DDD"
//       },
//       "geometry": {
//         "type": "Point", "coordinates": [ -114.19292449951173, 51.12895309822599 ]
//       } }
//   ]
// };
// const maps = {
//   1:{
//     mapName: 'jimbobs map of furry playGrounds',
//     user: "jimmy",
//     stars: 0,
//   },
//   2: {
//     mapName: 'Suzy Q and her pups',
//     user: 'NotSuzy',
//     stars: 5
//   },
//   3: {
//     mapName: 'dog park of pleasures',
//     user: 'John Doe',
//     stars: 2.5
//   }


// };

router.get("/", (req, res) => {
  getAllMapsAnon()
    .then(data => {
      res.send(data);
    })
});

router.get('/mymaps', isLoggedIn, (req, res) => {
  getAllMapsByUser(req.session.user_id)
    .then(data => res.send(data));
});

router.get('/favorites', isLoggedIn, (req, res) => {
  getAllFavMaps(req.session.user_id)
  .then(data => {
    console.log('Retrieving favorite maps...', data)
    res.send(data);
  })
});

router.get('/create', isLoggedIn, (req, res) => {
  res.send('Success');
})

router.get('/:id/pins', (req, res) => {
  const mapID = req.params.id;
  getPinsByMapID(mapID)
  .then(response => {
    console.log('getpinsbymapid gave me', response)
    res.send(response);
  })
})

router.get("/:id", isLoggedIn, (req,res) => {
  const { id } = req.params;
  getMapOfPinsByID(id)
    .then(data => {
      console.log('Retrieving...', data);
      res.json(data);
    })
});


//maps POST Routes

router.post('/', (req, res) => {
  console.log(req.body.map);
  const user_id = req.session.user_id;
  const submition = req.body.map;
  createNewMap(user_id,submition.name)
    .then(res => {
      console.log(submition.pins);
      manyPins(res.id, submition.pins);
    })
    .finally(res.status(200).send('ok'));

});

router.post('/addtofavorites', isLoggedIn, (req, res) => {
  const mapId = req.body.mapId;
  const userId = req.session.user_id;

  addToMyFav(userId, mapId)
    .then(favMapsEntry => {
      res.send(favMapsEntry);
    })
});

router.post('/edit', (req, res) => {
  res.status(200).send('going to edit something');
});

router.post('/:id/delete', (req, res) => {
  const { mapId } = req.body;
  const userId = req.session.user_id;
  deleteMyFav(userId, mapId)
    .then(() => {
      console.log(`mapId of ${mapId} and userId of ${userId} has been deleted.`);
      return res.send('Map removed from favorites.');
    })
    .catch(error => {
      return res.status(404).send(`Could not delete this map. Error message: ${error}`);
    })
});

module.exports = router;
