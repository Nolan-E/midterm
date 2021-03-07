-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS parks CASCADE;
CREATE TABLE parks (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
