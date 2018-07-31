const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const password = encryptLib.encryptPassword(req.body.personData.password);
  const partner = req.body.partnerData;
  const person = req.body.personData;

  const currentDateTime = new Date().toJSON().toString();

  const partnerQuery = `INSERT INTO partner
                        (name, location, date_created, type)
                        VALUES
                        ($1, $2, $3, $4)
                        RETURNING id;`
  const partnerValues = [partner.name, partner.location, currentDateTime, partner.type];
  pool.query(partnerQuery, partnerValues)
    .then(response => {
      console.log(response.rows[0]);
      const personQuery = `INSERT INTO person
                           (username, first_name, last_name, date_created, date_updated, partner_id, is_verified, user_type, password)
                           VALUES
                           ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
      const personValues = [person.username, person.first_name, person.last_name, currentDateTime, currentDateTime, response.rows[0].id, true, 'user', password];
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
