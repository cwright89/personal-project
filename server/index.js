require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const app = express()

app.use(express.json())
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

app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

app.post('/api/post', mainCtrl.createPost)
app.get('/api/posts/:id', mainCtrl.getPosts)
app.delete('/api/post/:id', mainCtrl.deletePost)

app.post('/api/comment', mainCtrl.createComment)
app.get('/api/comments/:id', mainCtrl.getComments)
app.delete('/api/comment/:id', mainCtrl.deleteComment)

app.listen(SERVER_PORT, () => console.log(`running on port ${SERVER_PORT}`))