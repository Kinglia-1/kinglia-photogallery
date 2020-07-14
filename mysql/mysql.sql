DROP DATABASE IF EXISTS bnbphotos;

CREATE DATEBASE IF NOT EXISTS bnbphotos;

USE bnbphotos;

CREATE TABLE users (
  user_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE rooms (
  room_id BIGINT NOT NULL,
  room_name VARCHAR(200) NOT NULL,
  PRIMARY KEY(room_id)
);

CREATE TABLE fav_lists (
  list_id TINYINT UNSIGNED NOT NULL,
  list_name VARCHAR(40) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (list_id)
);

CREATE TABLE fav_rooms (
  fav_room_id TINYINT UNSIGNED NOT NULL,
  FOREIGN KEY (list_id) REFERENCES fav_lists(list_id)
    ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (fav_room_id)
);

CREATE TABLE photos (
  photo_id BIGINT UNSIGNED NOT NULL,
  photo_description VARCHAR(280),
  photo_url VARCHAR(500) NOT NULL,
  photo_order TINYINT,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (photo_id)
);

