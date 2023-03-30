const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('./passport.js')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", false);

mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("connection established successfully")
})

app.use(session(
  {  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true}
))
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')


app.use('/post', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Running: ${port}`);
});