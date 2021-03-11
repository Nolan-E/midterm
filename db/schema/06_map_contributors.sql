-- Drop and creates map_contributors table

DROP TABLE IF EXISTS map_contributors CASCADE;
CREATE TABLE map_contributors (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  edit_date TIMESTAMP NOT NULL
);
