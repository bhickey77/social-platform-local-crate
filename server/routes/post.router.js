const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const multer  = require('multer');
const multerDest = process.env.multer_dest || '../uploads/';
const upload = multer({ dest: multerDest });

const { uploadPost, generateSignedUrls, updatePost } = require('../modules/uploadPost');
const { isAdmin } = require('../modules/authorization');

router.put('/:id', upload.single('file'), (req, res) => {
    // PUT for editing a post
    if(req.isAuthenticated()){
        updatePost(req, res);
    } else {
        res.sendStatus(403);
    }
});

router.put('/hide/:id', (req, res) => {
    // PUT for editing whether a post is hidden
    console.log('HIDING ID: ', req.user);
    
    if(req.isAuthenticated() && isAdmin(req.user)){
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
    console.log('hit the post post route: ');
    console.log(req.user);
    
    if (req.isAuthenticated()){
        uploadPost(req, res);
    } else {
        res.sendStatus(500);
    } 
});

router.get('/', (req, res) => {
    // GET for ALL posts - public view (does not return flagged posts)
        let queryText = `SELECT post.title, post.content, post.media_key, 
                            post.date_created, post.is_marked_as_hidden, 
                            post.id as post_id, partner.name as partner_name, 
                            post.partner_id as partner_id,
                            partner.media_key as partner_media_key,
                            partner.is_default_image
                         FROM post
                         INNER JOIN partner 
                         ON post.partner_id=partner.id 
                         WHERE post.is_marked_as_hidden=false 
                         ORDER BY post.date_created DESC`;
        pool.query(queryText).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

router.get('/filter/:filter/:filteredBy', (req, res) => {
    // GET for FILTERED posts - admin view (shows posts based on filter)
        if(req.isAuthenticated() && isAdmin(req.user)){
            console.log('filter test')
            let queryText = `SELECT post.title, post.content, post.media_key, post.date_created, post.is_marked_as_hidden, partner.name as partner_name,
                            partner.media_key as partner_media_key, partner.is_default_image
                            FROM post
                            INNER JOIN partner ON post.partner_id=partner.id WHERE`;
            if(req.params.filter === 'partner.name') {
                queryText = queryText + ` name=$1`;
            }
            else if(req.params.filter === 'post.is_marked_as_hidden') {
                queryText = queryText + ` post.is_marked_as_hidden=$1`;
            }
            pool.query(queryText,[req.params.filteredBy]).then((result) => {
                generateSignedUrls(res, result.rows);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            })
        
    } else {
        res.sendStatus(403);
    }
});

router.get('/all', (req, res) => {
    // GET for ALL posts - admin view (shows flagged and non-flagged posts)
    if(req.isAuthenticated() && isAdmin(req.user)){
        let queryText = `SELECT post.title, post.content, post.media_key, 
                            post.date_created, post.is_marked_as_hidden, post.id as post_id, 
                            partner.name as partner_name, post.partner_id as partner_id,
                            partner.media_key as partner_media_key,
                            partner.is_default_image
                         FROM post
                         INNER JOIN partner 
                         ON post.partner_id=partner.id 
                         ORDER BY post.date_created DESC`;
        pool.query(queryText).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/:id', (req, res) => {
    // GET for ALL posts - public view (does not return flagged posts)
        let queryText = `SELECT post.title, post.content, post.media_key, post.date_created, post.is_marked_as_hidden, post.id, partner.name
        FROM post
        INNER JOIN partner ON post.partner_id=partner.id WHERE post.partner_id=$1 ORDER BY post.date_created DESC`;
        pool.query(queryText, [req.params.id]).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

module.exports = router;