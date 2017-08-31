//Template/structure/model of document for shortURL
//Require mongoose
const mongoose = require('mongoose');
//Create instance of a mongoose schema
const Schema = mongoose.Schema;
//Actual schema setup for urlSchema
//NOTE no need for primary key as it is auto generated with _id
//timestamps object is optional but stores when an object is created
//Find out if timestamps changes when object is altered?
const urlSchema = new Schema ({
    originalUrl: String, 
    shorterUrl: String
},{timestamps: true});
//'url' is the collection(table in SQL) 'urlSchema' (structure)
const ModelClass = mongoose.model('shortUrl', urlSchema);
//Exports or allows other files to use ModelClass will be used in app.js
module.exports= ModelClass;