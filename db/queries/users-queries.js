const db = require('../../server');

// Gets all user data with email
const getUserWithEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(response => response.rows[0])
  .catch(err => err);
};

// Gets all user data with user ID
const getUserWithID = (userID) => {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [userID])
  .then(response => response.rows[0])
  .catch(err => err);
};

// Create new user
const addUser = (user) => {
  return db.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *;
  `, [user.name, user.email, user.password])
  .then(response => response.rows[0])
  .catch(err => err);
};

// Get the owner of a map with a mapID
const getUserIDWithMapID = (mapID) => {
  return db.query(`
    SELECT user_id
    FROM maps
    WHERE id = $1;
  `, [mapID])
  .then(response => response.rows[0])
  .catch(err => err);
};

//EXPORT FUNCTIONS
module.exports = {
  getUserWithEmail,
  getUserWithID,
  addUser,
  getUserIDWithMapID
};
