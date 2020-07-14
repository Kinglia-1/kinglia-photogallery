const fs = require('fs');
const faker = require('faker');
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const path = require('path');

