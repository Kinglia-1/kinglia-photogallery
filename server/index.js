const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {
  getPhotosSqL, getPhotos, postSaveToList, updateSaveToList, deleteItem,
} = require('./Controllers.js');

const port = 3003;

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.route('/api/rooms/:roomId/photos')
  .get(getPhotosSqL)
  .post(postSaveToList)
  .put(updateSaveToList)
  .delete(deleteItem);

app.get('/api/:roomId/photogallery', (req, res) => {
  getPhotos(req, res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
