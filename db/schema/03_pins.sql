-- Drop and recreate pins table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  image_url VARCHAR(255) NOT NULL DEFAULT 'https://via.placeholder.com/250x100.png?text=No+Image+Available',
  active BOOLEAN NOT NULL DEFAULT true
);
