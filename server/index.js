const newrelic = require('newrelic');
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {
  getPhotosSqL, getPhotos, postSaveToList, updateSaveToList, deleteItem,
} = require('./Controllers.js');


if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // cluster.on('exit', (worker, code, signal) => {
  //   console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
  //   cluster.fork();
  // });
} else {
  const app = express();

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

  app.listen(port, () => console.log(`listening at http://localhost:${port}`));
}
