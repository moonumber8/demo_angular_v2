var mongoose = require('mongoose');
var data_schema = mongoose.Schema({
    password:   {type:String},
    firstName: {type:String}, 
    lastName: {type:String}, 
    username: {type:String},
    update_timestam: {type:String},
    create_timestam: {type:String}
});

var dataModel = mongoose.model('datas', data_schema);
module.exports = dataModel;