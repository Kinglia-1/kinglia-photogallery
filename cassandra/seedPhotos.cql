USE bnbroom;

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room1.csv' WITH HEADER = true AND DELIMITER = ',';

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room2000001.csv' WITH HEADER = true AND DELIMITER = ',';

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room4000001.csv' WITH HEADER = true AND DELIMITER = ',';

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room5000001.csv' WITH HEADER = true AND DELIMITER = ',';

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room6000001.csv' WITH HEADER = true AND DELIMITER = ',';

COPY photos_by_room (room_id, photo_id, photo_url, photo_description, photo_order) FROM '/Volumes/Seagate Backup Plus Drive/SDC_CSV_FILES/photos_by_room8000001.csv' WITH HEADER = true AND DELIMITER = ',';