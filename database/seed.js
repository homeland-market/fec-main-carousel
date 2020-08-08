const mongoose = require('mongoose');
const db = require('./database.js').db;

const baseURL = 'https://fec-hrr47.s3.us-east-2.amazonaws.com';

//open a connection to the database
const picturesSchema = new mongoose.Schema({
  productId: Number,
  index: Number,
  fullSizeURL: String
});

//define the model
const Picture = mongoose.model('Picture', picturesSchema);

var randNumGenerator = (min, max) => {
  return Math.floor((Math.random() * max) + min);
}

//randomize pictures
//iterate through all productIDs, 1-99
for (var id = 1; id < 100; id++ ) {
  //choose a random number of pictures for the product, min 5, max 10 inclusive
  var maxIndex = randNumGenerator(5, 11);
  //then iterate through all indicies
  for (var index = 0; index < maxIndex; index++ ) {
    //generate a padded, random picture id between 1 and 40 inclusive
    var paddedID = randNumGenerator(1, 41).toString().padStart(5,0);
    //define a new document
    var picture = new Picture({
      'productId': id,
      'index': index,
      'fullSizeURL': `${baseURL}/${paddedID}.jpg`
    });

    //save to the database
    picture.save((err, picture) => {
      if (err) console.log('an error occurred writing to database: ', err);
    })
  }
}

//import product specific pictures
  //iterate from 1 to 9
for (var index = 1; index < 10; index++) {
  //define the picture id
  var paddedID = index.toString().padStart(5,0);
  //define a new document
  var picture = new Picture({
    'productId': 0,
    'index': index,
    'fullSizeURL': `${baseURL}/sunMoon${paddedID}.jpg`
  });

  //save to the database
  picture.save((err, picture) => {
    if (err) return console.log('an error occurred writing to database: ', err);
  })
}