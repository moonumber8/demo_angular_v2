var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var data_schema = mongoose.Schema({
    password:   {type:String},
    firstName: {type:String}, 
    lastName: {type:String}, 
    username: {type:String},
    update_timestam: {type:String},
    create_timestam: {type:String}
});


var data_review_schema = mongoose.Schema({
  text_review:   {type:String},
  user_id: {type:String},
  update_timestam: {type:String},
  create_timestam: {type:String}
});

  
data_schema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  data_schema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  data_schema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  

var dataModel = mongoose.model('datas', data_schema);
var dataReviewModel = mongoose.model('review', data_review_schema);
module.exports = dataModel,dataReviewModel;


