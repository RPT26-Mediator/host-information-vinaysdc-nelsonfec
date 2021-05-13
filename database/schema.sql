CREATE DATABASE airbnb;

CREATE TABLE hostinformation (
  id SERIAL NOT NULL PRIMARY KEY,
  host_name VARCHAR(255),
  date_joined TEXT,
  profile_pic TEXT,
  host_description TEXT,
  review_COUNT INT,
  is_verified BOOLEAN,
  is_superhost BOOLEAN,
  listing_id VARCHAR
);
