DROP DATABASE IF EXISTS bnbphotos;

CREATE DATABASE IF NOT EXISTS bnbphotos;

USE bnbphotos;

CREATE TABLE users (
  user_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  user_name VARCHAR(200),
  PRIMARY KEY (user_id)
);

CREATE TABLE rooms (
  room_id INT AUTO_INCREMENT NOT NULL,
  room_name VARCHAR(200),
  PRIMARY KEY(room_id)
);

CREATE TABLE fav_lists (
  list_id INT AUTO_INCREMENT NOT NULL,
  list_name VARCHAR(40) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (list_id)
);

CREATE TABLE fav_rooms (
  fav_room_id INT AUTO_INCREMENT NOT NULL,
  list_id INT NOT NULL,
  room_id INT NOT NULL,
  FOREIGN KEY (list_id) REFERENCES fav_lists(list_id)
    ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  PRIMARY KEY (fav_room_id)
);

CREATE TABLE photos (
  photo_id INT UNSIGNED AUTO_INCREMENT NOT NULL,
  photo_description VARCHAR(280),
  photo_url VARCHAR(500) NOT NULL,
  photo_order TINYINT,
  room_id INT NOT NULL,
  PRIMARY KEY (photo_id),
   FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

