const express = require('express');
const router  = express.Router();
const {
  getAllMapsAnon,
  getAllMapsByUser,
  getMapsByID,
  getMapOfPinsByID,
  createNewMap
} = require('../db/queries/maps-queries');
const {
  getAllFavMaps,
  addToMyFav
} = require('../db/queries/fav-maps-queries');
const {createPin,
  manyPins
} = require('../db/queries/pins-queries.js');
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
//maps GET Routes

//will get all maps for sidebar display on initial load
router.get("/", (req, res) => {
  getAllMapsAnon()
    .then(data => {
      res.send(data);
    })

  // res.json(maps);
});

router.get('/mymaps', (req, res) => {
  // isLoggedIn middleware
  if (!req.session.user_id) {
    return res.status(401).send('Please log in to view this content.');
  }
  getAllMapsByUser(req.session.user_id)
    .then(data => {
      console.log(data)
      res.send(data);
    })
});

//will get all maps for sidedbar that are users favorited maps
router.get('/favorites', (req, res) => {
  // isLoggedIn middleware
  if (!req.session.user_id) {
    return res.status(401).send('Please log in to view this content.');
  }
  getAllFavMaps(req.session.user_id)
  .then(data => {
    console.log('Retrieving favorite maps...', data)
    res.send(data);
  })
});

//will get map by name
router.get("/:id", (req,res) => {
  const { id } = req.params;
  getMapOfPinsByID(id)
    .then(data => {
      console.log('Retrieving...', data);
      res.json(data);
    })
});


//maps POST Routes

//will recive geojson and user helper function and queries to insert into db
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

router.post('/addtofavorites', (req, res) => {
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
  console.log('Inside map routes post maps delete');
  res.send('maps deletion in progress');
});

module.exports = router;
