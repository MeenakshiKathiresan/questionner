const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


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

app.use(cors());
app.use(express.json());

const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')


app.use('/posts', postsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Running: ${port}`);
});