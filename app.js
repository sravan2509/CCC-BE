const mongoose = require('mongoose');
var cors = require('cors');

const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const routes = require('./routes/routes');
const auth = require('./routes/auth');
const user = require('./routes/user');
const comments = require('./routes/comments');
const challenges = require('./routes/challenges');
const fiddleRoute=require('./routes/fiddle')
const axios = require("axios")


//connect and display the status
mongoose.connect('mongodb+srv://Sravan:Sravan@cluster0.uqai2oe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => { console.log("connected to DB"); })
    .catch(() => { console.log("error connecting"); });


//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS,DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use('/api/v1', routes)
app.use('/auth', auth);
app.use('/user', user);
app.use('/challenge',challenges)
app.use('/comments', comments);
app.use('/fiddles', fiddleRoute);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

module.exports=app;
