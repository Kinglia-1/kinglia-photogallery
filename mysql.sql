DROP DATABASE IF EXISTS bnbphotos;

CREATE DATEBASE IF NOT EXISTS bnbphotos;

USE bnbphotos;

CREATE TABLE rooms (
  room_id BIGINT NOT NULL,
  room_name VARCHAR(200) NOT NULL,
  FOREIGN KEY (list_id) REFERENCES fav_lists(list_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY(room_id)
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

CREATE TABLE users (
  user_id BIGINT UNSIGNED NOT NULL,
  user_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE fav_lists (
  list_id TINYINT NOT NULL,
  list_name VARCHAR(40) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCASE
    ON DELETE CASCASE,
  PRIMARY KEY (list_id)
);