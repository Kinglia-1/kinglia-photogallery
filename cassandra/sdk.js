const AWS = require('aws-sdk');
const path = require('path')
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const getPhotos = () => {
  return s3.listObjectsV2({ Bucket: 'bnbphotos23' }).promise()
    .then((data) => {
      const allPhotos = data.Contents.map((photo) => {
        const photoKey = photo.Key;
        const photoUrl = `https://bnbphotos23.s3-us-west-1.amazonaws.com/${photoKey}`;
        return photoUrl;
      });
      return allPhotos;
    })
    .catch((err) => {
      console.log(err);
    });
};
console.log(path.parse(process.cwd()).root)
module.exports = { getPhotos };
