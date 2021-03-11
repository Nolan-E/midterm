-- Drop and creates fav_maps table

DROP TABLE IF EXISTS fav_maps CASCADE;
CREATE TABLE fav_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  rating INTEGER,
  review TEXT,
  fav_date TIMESTAMP NOT NULL,
  last_edit TIMESTAMP,
  active BOOLEAN NOT NULL DEFAULT true
);
