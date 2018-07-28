const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/:id', (req, res) => {
    // PUT for editing text in a post
    if(req.isAuthenticated()){
        queryText = `UPDATE post SET text = $2 where id = $1;`;
        pool.query(queryText, [req.body.id, req.body.edit_value]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /editSupplierPost:', error);});
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

router.post('/', (req, res) => {
    //POST for supplier creating a new post
    if (req.isAuthenticated()){
        console.log('this is req.body for new posting', req.body);
        const isflagged = true;
        const date_created = new Date().toJSON().toString();
        const date_updated = "n/a";
        const queryText = `INSERT INTO post (supplier_id, "title", "text", "media_url", "date_created", "date_updated", isflagged)
        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [
            req.user.id,
            req.body.title,
            req.body.text,
            req.body.media_url,
            date_created,
            date_updated,
            isflagged
        ]).then((result) => {
            console.log('back from db with:', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in POST', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    } 
});

router.get('/', (req, res) => {
    // GET for ALL posts - public view (can limit volume in query)
    if (req.isAuthenticated()){
        console.log('in GET route to get all posts');
        console.log('user', req.user);
        let queryText = `SELECT * FROM post`;
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

module.exports = router;