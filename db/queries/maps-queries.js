const db = require('../../server');

const getAllMapsAnon = () => {
  return db.query(`
    SELECT maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by
    FROM maps
    JOIN users ON maps.user_id = users.id
    ORDER BY map_created DESC;`
  )
    .then((response) => {
      return response.rows;
    });
};
const getAllMapsByUser = (userName) => {
  return db.query(`
    SELECT maps.name AS map_name, maps.date_created AS map_created, users.name AS created_by
    FROM maps
    JOIN users ON maps.user_id = users.id
    WHERE users.name = $1
    ORDER BY map_created DESC;`, [userName]
  )
    .then((response) => {
      return response.rows;
    });
};

  const getUserMap = (userID, mapID) => {
    return db.query(`
    SELECT * FROM maps
    JOIN users ON users.id = maps.user_id
    WHERE users_id = $1 AND maps.id = $2;`, [userID, mapID])
    .then((response) => {
      return response.rows[0];
    });
};


// select users.name as user_name, maps.name as map_name, pins.*
// from pins
// join maps on pins.map_id = maps.id
// join users on maps.user_id = users.id
// where users.name LIKE 'Alice';
