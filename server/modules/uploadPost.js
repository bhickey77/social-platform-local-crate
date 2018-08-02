const pool = require('../modules/pool');

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
const path = require('path');
const fs = require('fs-extra');
const tempfile = require('tempfile');

const AWS = require('aws-sdk');

const BUCKET_NAME = 'local-crate-social-platform';
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;
 
const uploadPost = async(req, res) => {
  let media_key = await uploadToS3(req.file);
  let status = await uploadToSQL(req, media_key);
  res.sendStatus(200);
}

const generateSignedUrls = async (res, rows) => {
  const newRows = await addSignedUrls(rows);
  res.send(newRows);
}

const addSignedUrls = async rows => {
  const newRows = [];
  for(const row of rows){
    const media_url = await generateSignedUrl(row.media_key);
    row.media_url = media_url;
    newRows.push(row);
  }  
  return new Promise(resolve => {
    resolve(newRows);
  })
}

function generateSignedUrl(key) {
return new Promise(revolve => {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
    signatureVersion: 'v4',
  });
  let urlParams = {Bucket: 'local-crate-social-platform', Key: key};
  // console.log({urlParams});
  s3bucket.getSignedUrl('getObject', urlParams, function(error, url) {
    if(error){
      console.log(error);
      resolve('');
    } else {
      // console.log('url in getsigned response: ', url);
      revolve(url);
    }
  })
})
}

generateSignedUrl = (media_key) => {
  return new Promise(resolve => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
      region: 'us-east-2',
    });
    let urlParams = {Bucket: 'local-crate-social-platform', Key: media_key};
    s3bucket.getSignedUrl('getObject', urlParams, function(err, url) {
      if(err){
        console.log(`error with getsignedurl: `, err);
      } else {
        // console.log(`url from getsignedurl: `, url);
        resolve(url);
      }       
    })
  })
}

function uploadToSQL(req, media_key) {
  return new Promise(resolve => {
    const is_marked_as_hidden = false;
    const date_created = new Date().toJSON().toString();
    const date_updated = new Date().toJSON().toString();
    const queryText = `INSERT INTO post ("partner_id", "title", "content", "media_key", "date_created", "date_updated", "is_marked_as_hidden")
    VALUES($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(queryText, [
        1,
        req.body.title,
        req.body.content,
        media_key,
        date_created,
        date_updated,
        is_marked_as_hidden,
    ]).then((result) => {
        console.log('back from db with:', result);
        resolve(200);
    }).catch((error) => {
        console.log('error in POST', error);
        resolve(500);
    })
  })
}

function uploadToS3(file) {
  return new Promise(resolve => {
    fs.readFile(file.path)
    .then(data => {
      console.log(`file read: `, data);
      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        signatureVersion: 'v4',
      });
      s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: file.filename,
          Body: data,
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
            console.log('success');
            console.log(data.Key);
            resolve(data.Key);
        })
      })
    })
    .catch(error => {
      console.log(`error reading file: `, error);
    })
  })
}

module.exports = { uploadPost, generateSignedUrls };
