//Require Express
const express = require('express');
//Create our app and instantiate instances
const app = express();
//Require additional packages
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//Retrieves the template/model for shortUrl schema
const shortUrl = require('./models/shortUrl');
//Instantiante instances
app.use(bodyParser.json());
app.use(cors());
//Connect to our database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

//Get public folder allowing us to use the files for the front send
app.use(express.static(__dirname + '/public'));
app.get('/new/:urlToShorten', (req, res, next)=>{

var urlToShorten = req.params.urlToShorten;
//Check to see if passed in url is in correct form
var expression =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = expression;

if(regex.test(urlToShorten)){
var short= Math.floor(Math.random()*1000000).toString();
// console.log(short);
    //Create object to send to the database
var data = new shortUrl(
    {
        originalUrl: urlToShorten,
        shorterUrl: short
    }
);
//Saves to database and throws error message if it fails
data.save(err=>{
if(err){
 return res.send('Error saving to database');
}
});
return res.json(data);
}
var data = new shortUrl(
    {
        originalUrl: 'urlToShorten',
        shorterUrl: 'Invalid URL'
    }
);
return res.json(data);
});

//Listen to see if everything is working and launching properly locally or on heroku
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
