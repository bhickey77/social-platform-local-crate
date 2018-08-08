const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();
const { uploadPost, generateSignedUrls, updatePost } = require('../modules/uploadPost');


router.get('/', (req, res) => {
    // GET for ALL partners - admin view (can limit volume in query)
    if (req.isAuthenticated()){
        console.log('in GET route to get all partners');
        console.log('user', req.user);
        // let queryText = `SELECT username, organization_name,
        // supplier_location, supplier_type, date_created, date_updated
        // FROM partner WHERE user_type != 'admin'`;
        let queryText = `SELECT * FROM person
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
        console.log('in GET route to get a partner bio');
        console.log('in router.get', req.params.id);
        let queryText = `SELECT * FROM partner
        INNER JOIN post ON partner.id=post.partner_id WHERE partner.id=$1
        ORDER BY post.date_created DESC;`;
        pool.query(queryText, [req.params.id]).then((result) => {
            generateSignedUrls(res, result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});

router.get('/:id/posts', (req, res) => {
    // GET for all posts from specific partner
    if (req.isAuthenticated()){
        console.log('in GET route to get all posts from a partner');
        console.log('user', req.user);
        let queryText = `SELECT * FROM post WHERE partner_id =$1`;
        pool.query(queryText, [req.body.partner_id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
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

module.exports = router;