DROP KEYSPACE IF EXISTS bnbroom;

CREATE KEYSPACE IF NOT EXISTS bnbroom WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 3};

USE bnbroom;

CREATE TABLE photos_by_room (
  room_id bigint,
  photo_id timeuuid,
  photo_url text,
  photo_description text,
  photo_name text,
  photo_order tinyint,
  PRIMARY KEY((room_id), photo_id)
)
WITH comment = 'Get photos by room id’;

CREATE TABLE favlists_by_users (
  user_id timeuuid,
  list_id timeuuid,
  list_name text,
  PRIMARY KEY ((user_id), list_id)
)
WITH CLUSTERING ORDER BY (list_id DESC)
WITH comment = ‘Get favorite lists by user id’;

CREATE TABLE favrooms_by_favlist (
  list_id timeuuid,
  room_id bigint,
  room_name text,
  created_at timestamp,
  PRIMARY KEY ((list_id), created_at)
)
WITH CLUSTERING ORDER BY (created_at_id DESC)
WITH comment = 'Get rooms in user's specific favorite list';

