require('dotenv').config()
const express = require('express')
const router = express.Router()
const cors = require('cors')
const nodemailer = require('nodemailer')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const path = require('path')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const app = express()

app.use(cors());
app.use(express.json())
app.use('/', router);
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "connorwwright1989@gmail.com",
      pass: "Jessbart14",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "connorwwright1989@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        console.log(error)
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

app.post('/api/post', mainCtrl.createPost)
app.get('/api/posts/:id', mainCtrl.getPosts)
app.delete('/api/post/:id', mainCtrl.deletePost)
app.post('/api/comment', mainCtrl.createComment)
app.get('/api/comments/:id', mainCtrl.getComments)
app.delete('/api/comment/:id', mainCtrl.deleteComment)

app.put('/api/user/:id', mainCtrl.updateUsername)
app.put(`/api/user/:id`, mainCtrl.updateProfilePic)

app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`))