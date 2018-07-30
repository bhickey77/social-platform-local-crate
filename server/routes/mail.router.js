const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const USER = process.env.EMAIL_USERNAME;
const PASS = process.env.EMAIL_PASSWORD;

var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: USER,
      pass: PASS
    }
  }
  
var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });


  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    // var content = `name: ${name} \n email: ${email} \n message: ${message} `
    var content = `Sign up for Social Crate here: http://localhost:3000/?#/PartnerMailUrl`
  
    var mail = {
      from: name,
      to: email,  //Change to email address that you want to receive messages on
      subject: 'Thank you for being a Local Crate Partner - Sign up at Social Crate!',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })





module.exports = router;