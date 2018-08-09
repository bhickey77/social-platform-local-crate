const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();
const { generateSignedUrlForCurrentUser } = require('../modules/uploadPost');

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

router.get('/info', rejectUnauthenticated, (req, res) => {
  console.log('In the route api/user/info', req.user);
  const queryText = `SELECT partner.name as "partner_name", 
                      username, first_name, partner_id, user_type, 
                      city, state, is_default_image, media_key  
                     FROM person
                     JOIN partner ON partner.id = person.partner_id 
                     WHERE person.id = $1;`
  pool.query(queryText, [req.user.id])
    .then(response => {
      console.log('Back from the db in the get user info route: ', response.rows[0]);
      if(!response.rows[0].is_default_image){
        generateSignedUrlForCurrentUser(res, response.rows[0]);
      } else {
        res.send((response.rows));
      }
    })
    .catch(error => {
      // console.log('Error with the get user info route: ', error);
      res.sendStatus(500)
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const password = encryptLib.encryptPassword(req.body.personData.password1);
  const partner = req.body.partnerData;
  const person = req.body.personData;
  console.log(req.body);
  const currentDateTime = new Date().toJSON().toString();

  const partnerQuery = `INSERT INTO partner
                        (name, city, state, website, date_created, type, media_key, is_default_image)
                        VALUES
                        ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING id;`;
  const partnerValues = [partner.name, partner.city, partner.state, partner.website, currentDateTime, partner.type, null, true];
  pool.query(partnerQuery, partnerValues)
    .then(response => {
      console.log(response.rows[0]);
      const personQuery = `INSERT INTO person
                           (username, first_name, last_name, email, phone, date_created, date_updated, partner_id, is_verified, user_type, password)
                           VALUES
                           ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
      const personValues = [person.username, person.first_name, person.last_name, person.email, person.phone, currentDateTime, currentDateTime, response.rows[0].id, true, 'user', password];
      pool.query(personQuery, personValues)
        .then(response => {
          console.log(`successfully inserted into person: `, response);
          res.sendStatus(200);
        })
        .catch(error => {
          console.log(`error inserting into person: `, error);
          res.sendStatus(500);
        })
    })
    .catch(error => {
      console.log(`error with insert into partner: `, error);
      res.sendStatus(500);
    })
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
