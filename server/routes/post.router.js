const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });

const { uploadPost, generateSignedUrls } = require('../modules/uploadPost');

// Authorization
const ConnectRoles = require('connect-roles');
const user = new ConnectRoles({
  failureHandler: function (req, res, action) {
    // optional function to customise code that runs when
    // user fails authorisation
    var accept = req.headers.accept || '';
    res.status(403);
    if (~accept.indexOf('html')) {
      res.render('access-denied', {action: action});
    } else {
      res.send('Access Denied - You don\'t have permission to: ' + action);
    }
  }
});




router.put('/:id', (req, res) => {
    // PUT for editing text in a post
    if(req.isAuthenticated()){
        queryText = `UPDATE post SET content = $2 where id = $1;`;
        pool.query(queryText, [req.body.id, req.body.edit_value]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /editSupplierPost:', error);});
    } else {
        res.sendStatus(403);
    }
});


router.put('/hide/:id', (req, res) => {
    // PUT for editing whether a post is hidden
    if(req.isAuthenticated()){
        console.log( req.body )
        queryText = `UPDATE post SET is_marked_as_hidden = $1 where id = $2;`;
        pool.query(queryText, [!req.body.post_is_hidden, req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for hide post:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    //DELETE for admin or partner to delete a post
    if(req.isAuthenticated()){
        queryText = `DELETE FROM post where id = $1;`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling DELETE for /deletePost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.post('/', upload.single('file'), (req, res) => {
    // console.log('hit the post post route: ', req.file);
    if (req.isAuthenticated()){
        uploadPost(req, res);
    } else {
        res.sendStatus(500);
    } 
});

router.get('/', (req, res) => {
    // GET for ALL posts - public view (does not return flagged posts)
        let queryText = `SELECT * FROM post where is_marked_as_hidden = false ORDER BY id DESC`;
        pool.query(queryText).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

router.get('/all', (req, res) => {
    // GET for ALL posts - admin view (shows flagged and non-flagged posts)
        console.log('in router admin post ALL');
        let queryText = `SELECT * FROM post ORDER BY id DESC`;
        pool.query(queryText).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

module.exports = router;