const db = require('../../server');

const getAllMaps = () => {
  return db.query(`
  SELECT * FROM maps`)
    .then((response) => {
      return response.rows;
    });
};

const getAllMapsByUser = (userID) => {
  return db.query(`
    SELECT * FROM maps
    JOIN users ON users.id = maps.user_id
    WHERE user_id = $1;`, [userID])
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
