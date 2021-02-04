const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors')

nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'connorwwright1989@gmail.com',
        pass: 'Jessbart14'
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});


router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `
    var mail = {
      from: name,
      to: 'connorwwright1989@gmail.com',
      subject: subject,
      text: content
    }
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })
