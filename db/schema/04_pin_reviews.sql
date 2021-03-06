-- Drop and create pin_reviews table

DROP TABLE IF EXISTS pin_reviews CASCADE;
CREATE TABLE pin_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stars INTEGER DEFAULT 0,
  message TEXT DEFAULT 'none',
  date_created TIMESTAMP NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);
