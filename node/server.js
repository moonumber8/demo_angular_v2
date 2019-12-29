const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db');
const dataModel = require('./data_schema');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentialls',true);
    next();
});

app.route('/register').get(function(req, res){
    res.send("get " + req.query)
}).post(function(req, res){
    dataModel.create(req.body, (err, doc)=>{
        if(err) res.json({result:"failed"});
        res.json({data: doc});
    }); 
}).delete(function(req, res){
    res.send("delete")
});



app.listen(3000,()=>{
    console.log("server ok");
})