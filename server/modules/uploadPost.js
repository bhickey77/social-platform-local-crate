const pool = require('../modules/pool');

const multer  = require('multer');
const multerDest = process.env.multer_dest || '../uploads/';
const upload = multer({ dest: multerDest });
const path = require('path');
const fs = require('fs-extra');
const tempfile = require('tempfile');

const AWS = require('aws-sdk');

const BUCKET_NAME = process.env.bucket_name;
const IAM_USER_KEY = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;
 
const uploadPost = async(req, res) => {
  let media_key = await uploadToS3(req.file);
  await uploadToSQL(req, media_key);
  res.sendStatus(200);
}

const updatePost = async(req, res) => {
  let media_key = false;
  console.log('IN UPDATEPOST: ', req.body.isNewImage);
  console.log(req.body.isNewImage);
  if(req.body.isNewImage !== 'false'){
    media_key = await uploadToS3(req.file);
  } 
  await updateSQL(req, media_key);
  res.sendStatus(200);
}

const updateProfilePicture = async(req, res) => {
  let media_key = await uploadToS3(req.file);
  await uploadToSQLProfilePicture(req, media_key);
  res.sendStatus(200);
}

const generateSignedUrlForCurrentUser = async(res, userInfo) => {
  console.log('NEW INFO: ', userInfo);
  const newInfo = await addSignedUrlForCurrentUser(userInfo);
  res.send([newInfo]);
}

const generateSignedUrls = async (res, rows) => {
  console.log(rows);
  const newRows = await addSignedUrls(rows);
  res.send(newRows);
}

const addSignedUrlForCurrentUser = async userInfo => {
  if(!userInfo.is_default_image){
    userInfo.partner_media_url = await generateSignedUrl(userInfo.media_key);
  }
    return new Promise(resolve => {
    resolve(userInfo);
  })
}

const addSignedUrls = async rows => {
  const newRows = [];
  for(const row of rows){
    console.log(row);
    const media_url = await generateSignedUrl(row.media_key);
    row.media_url = media_url;
    if(!row.is_default_image){
      const partner_media_url = await generateSignedUrl(row.partner_media_key);
      row.partner_media_url = partner_media_url;
    }
    newRows.push(row);
  } 
  return new Promise(resolve => {
    resolve(newRows);
  })
}

const generateSignedUrl = (media_key) => {
  return new Promise(resolve => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
      region: 'us-east-1',
    });
    let urlParams = {Bucket: BUCKET_NAME, Key: media_key};
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

function uploadToSQLProfilePicture(req, media_key) {
  return new Promise(resolve => {
    let queryText = `UPDATE partner
                     SET media_key = $2, is_default_image = $3
                     WHERE id = $1;`
    pool.query(queryText, [req.params.id, media_key, false])
      .then(response => {
        resolve();
      })
      .catch(error => {
        resolve();
      })
  })
} 

function updateSQL(req, media_key) {
  return new Promise(resolve => {
    const date_updated = new Date().toJSON().toString();
    let queryText = '';
    let values = [req.params.id, req.body.title, req.body.content, date_updated];
    if(media_key){
      queryText = `UPDATE post 
      SET "title" = $2, "content" = $3, "date_updated" = $4, "media_key" = $5
      WHERE id = $1;`;
      values.push(media_key);
    } else {
      queryText = `UPDATE post 
      SET "title" = $2, "content" = $3, "date_updated" = $4
      WHERE id = $1;`;
    }
    
    pool.query(queryText, values)
    .then((result) => {
      console.log('back from db with:', result);
      resolve(200);
    }).catch((error) => {
        console.log('error in POST', error);
        resolve(500);
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
        req.body.partner_id,
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

module.exports = { uploadPost, generateSignedUrls, updatePost, updateProfilePicture, generateSignedUrlForCurrentUser };