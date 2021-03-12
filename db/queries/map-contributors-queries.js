const db = require('../../server');

// Create an entry of map editor history
const editMap = (mapID, userID) => {
  return db.query(`
    INSERT INTO map_contributors (map_id, user_id, edit_date)
    VALUES ($1, $2, current_timestamp) RETURNING *;`, [mapID, userID,]
  )
  .then(response => response.rows[0])
  .catch(err => err);
};
// Gets a list of all maps by creator
const getRecentEdits = (mapID) => {
  return db.query(`
    SELECT map_id, maps.name AS map_name, map_contributors.user_id, users.name AS user_name, edit_date
    FROM map_contributors
    LEFT JOIN maps ON maps.id = map_id
    LEFT JOIN users ON users.id = maps.user_id
    WHERE map_id = $1
    ORDER BY edit_date DESC
    LIMIT 10;`, [mapID]
  )
  .then(response => response.rows)
  .catch(err => err);
};

//EXPORT FUNCTIONS
module.exports = {
  editMap,
  getRecentEdits
};
