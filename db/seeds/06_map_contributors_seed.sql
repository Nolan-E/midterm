-- Drop and creates map_contributors table
INSERT INTO map_contributors (map_id, user_id, edit_date)
VALUES (1, 1, current_timestamp),
(2, 2, current_timestamp),
(3, 3, current_timestamp),
(4, 4, current_timestamp),
(5, 5, current_timestamp),
(6, 1, current_timestamp);




DROP TABLE IF EXISTS map_contributors CASCADE;
CREATE TABLE map_contributors (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  edit_date TIMESTAMP NOT NULL,
  edit_type VARCHAR(32) NOT NULL
);
