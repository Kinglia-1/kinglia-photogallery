const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const Controllers = require('./Controllers.js');

const port = 3004;

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/:roomId/photogallery', (req, res) => {
  Controllers.getPhotos(req, res);
});

app.post('/api/:roomId/photogallery', (req, res) => {
  Controllers.postSaveToList(req, res);
});

app.put('/api/:roomId/photogallery', (req, res) => {
  Controllers.updateSaveToList(req, res);
});

app.delete('/api/:roomId/photogallery', (req, res) => {
  Controllers.deleteItem(req, res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
