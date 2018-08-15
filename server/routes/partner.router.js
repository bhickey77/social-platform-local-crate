const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();
const { uploadPost, generateSignedUrls, updatePost } = require('../modules/uploadPost');


const multer  = require('multer');
const multerDest = process.env.multer_dest || '../uploads/';
const upload = multer({ dest: multerDest });

const { updateProfilePicture, generateSignedUrlForCurrentUser } = require('../modules/uploadPost');

router.get('/', (req, res) => {
    // GET for ALL partners - admin view (can limit volume in query)
    if (req.isAuthenticated()){
        console.log('in GET route to get all partners');
        console.log('user', req.user);
        let queryText = `SELECT *
                         FROM person
                         JOIN partner ON partner.id = person.partner_id
                         WHERE user_type != 'admin';`
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.get('/:id', (req, res) => {
    // GET for specific partner - partner and post info
        console.log('IN GET PARTNER INFO ROUTE');
        const id = Number(req.params.id);
        console.log('in router.get', id);
        console.log('in router.get', req.params.id);
        let queryText = `SELECT * FROM partner
                         WHERE id = $1;`;
        pool.query(queryText, [id])
            .then((result) => {
                generateSignedUrlForCurrentUser(res, result.rows[0]);
            }).catch((error) => {
                console.log('error getting partner info: ', error);
                res.sendStatus(500);
            })
});

router.get('/:id/posts', (req, res) => {
    // GET for all posts from specific partner
    console.log('in GET route to get all posts from a partner');
    console.log('user', req.params.id);
    let queryText = `SELECT post.title, post.content, post.media_key, 
                        post.date_created, post.is_marked_as_hidden, 
                        post.id as post_id, partner.name as partner_name, 
                        post.partner_id as partner_id,
                        partner.media_key as partner_media_key,
                        partner.is_default_image
                    FROM post
                    INNER JOIN partner 
                    ON post.partner_id=partner.id 
                    WHERE post.is_marked_as_hidden=false AND partner_id =$1 
                    ORDER BY post.date_created DESC`;
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log(`BACK IN THE PARTNER ROUTER FOR PARTNER POSTS:`, result.rows);
        generateSignedUrls(res, result.rows);
    }).catch((error) => {
        console.log('ERROR WITH THE GET PARTNER POSTS ROUTE: ', error);
        res.sendStatus(500);
    })
});

router.put('/:id', (req, res) => {
    // PUT for admin flagging a post
    if(req.isAuthenticated()){
        if (req.body.is_marked_as_hidden == true){
            queryText = `UPDATE person SET is_marked_as_hidden = false where id = $1;`;
        } else {
            queryText = `UPDATE person SET is_marked_as_hidden = true where id = $1;`;
        }
        pool.query(queryText, [req.body.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /flagPost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    //DELETE for admin to delete partner entirely
    if(req.isAuthenticated()){
        queryText = `DELETE FROM person where id = $1;`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling DELETE for /deletePartner:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.put('/:id', (req, res) => {
    // PUT for partner to edit their account

    const body = req.bodyl

    const password = encryptLib.encryptPassword(req.body.password);

    if(req.isAuthenticated()){
        queryText = `UPDATE person SET (username = $1, organzation_name = $2, 
                    supplier_type = $3, password = $4 where id = $5;`;
        pool.query(queryText, [body.username, body.organiztation_name,
                                body.supplier_type, password = password, req.params.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /editPartner:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.put('/profilePicture/:id', upload.single('file'), (req, res) => {
    if(req.isAuthenticated()){
        updateProfilePicture(req, res);
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;