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
    WHERE users_id = $1;`, [id])
    .then((response) => {
      return response.rows;
    });
};

const getUserMap = (userID, mapID) => {
  return db.query(`
    SELECT * FROM maps
    WHERE users_id = $1;`, [id])
    .then((response) => {
      return response.rows;
    });
};
