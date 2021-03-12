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

router.get("/", (req, res) => {
  getAllMapsAnon()
    .then(data => {
      res.send(data);
    })
});

router.get('/mymaps', isLoggedIn, (req, res) => {
  getAllMapsByUser(req.session.user_id)
    .then(data => {
      // console.log('getAllMapsByUser returned the following:', data)
      return res.send(data)
    });
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
  console.log('router get map id is', req.params)
  getPinsByMapID(mapID)
  .then(response => {
    console.log('getpinsbymapid gave me', response);
    res.send(response);
  })
})

router.get("/:id", (req,res) => {
  const id = req.params.id;
  console.log('map id is', id)
  getMapOfPinsByID(id)
    .then(data => {
      console.log('Retrieving...', data);
      res.json(data);
    })
    // getMapsByID(mapId)
    //   .then(response => {
    //     console.log('response from getmapsbyid is', response[0])
    //     res.json(response[0]);
    //   })
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
  console.log('mapId', mapId, 'userId', userId)
  deleteMap(userId, mapId)
    .then(() => {
      console.log(`mapId of ${mapId} and userId of ${userId} has been deleted.`);
      return res.send('Map removed from favorites.');
    })
    .catch(error => {
      return res.status(404).send(`Could not delete this map. Error message: ${error}`);
    })
});

router.post('/:id/deletefromfavorites', (req, res) => {
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
