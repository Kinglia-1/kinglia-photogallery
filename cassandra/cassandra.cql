DROP KEYSPACE IF EXISTS bnbroom;

CREATE KEYSPACE bnbroom
  WITH REPLICATION = {
   'class' : 'SimpleStrategy',
   'replication_factor' : 3
  };

USE bnbroom;

CREATE TABLE photos_by_room (
  room_id bigint,
  photo_id timeuuid,
  photo_url text,
  photo_description text,
  photo_order tinyint,
  PRIMARY KEY((room_id), photo_order)
)
WITH CLUSTERING ORDER BY (photo_order ASC);

CREATE TABLE favlists_by_users (
  user_id timeuuid,
  list_id timeuuid,
  list_name text,
  PRIMARY KEY ((user_id), list_id)
)
WITH CLUSTERING ORDER BY (list_id DESC);

CREATE TABLE favrooms_by_favlist (
  list_id timeuuid,
  room_id bigint,
  room_name text,
  created_at timestamp,
  PRIMARY KEY ((list_id), created_at)
)
WITH CLUSTERING ORDER BY (created_at DESC);

