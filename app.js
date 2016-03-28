var express = require("express");
var redis = require("./models/redis.js");
var bodyParser = require('body-parser');

var app = express();
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/',function(req,res){
	if(!(req.body.owner && req.body.type && req.body.content)){
		return res.json({code:0,msg:"信息不完整"});
	}

	redis.throw(req.body,function(result){
		res.json(result);
	});
});

app.get('/',function(req,res){
	if(!req.query.user){
		return res.json({code:0,msg:"信息不完整"});
	}
	redis.pick(req.query,function(result){
		res.json(result);
	});
});

app.post('/back',function(req,res){
	redis.throwBack(req.body,function(result){
		res.json(result);
	});
});

app.listen(3000);

