var redis = require("redis"),
	client = redis.createClient(6380,"117.121.25.228",{});

/*扔瓶子*/
exports.throw = function(bottle,callback){
	bottle.time = bottle.time || Date.now();
	var bottleId = Math.random().toString(16);
	var type = {male:0,female:1};
	console.log(type[bottle.type]);
	client.SELECT(type[bottle.type],function(){
		client.HMSET(bottleId,bottle,function(err,result){
			if(err){
				return callback({code:0,msg:"过会儿再来试试吧！"});
			}
			callback({code:1,msg:result});
			client.EXPIRE(bottleId,86400);
		});
	});
}

/*扔回瓶子*/
exports.throwBack = function(bottle,callback){
	var bottleId = Math.random().toString(16);
	var type = {male:0,female:1};
	client.SELECT(type[bottle.type],function(){
		client.HMSET(bottleId,bottle,function(err,result){
			if(err){
				return callback({code:0,msg:"过会儿再来试试吧！"});
			}
			callback({code:1,msg:result});
			client.EXPIRE(bottleId,bottle.time+86400000 - Date.now());
		});
	});
}

/*捡瓶子*/
exports.pick = function(info,callback){
	if(Math.random() <= 0.2){
		return callback({code:0,msg:"海星"});
	}
	var type = {all:Math.round(Math.random()),male:0,female:1};
	info.type = info.type || 'all';
	client.SELECT(type[info.type],function(){
		client.RANDOMKEY(function(err,bottleId){
			if(!bottleId){
				return callback({code:0,msg:"海星"});
			}
			client.HGETALL(bottleId,function(err,bottle){
				if(err){
					return callback({code:0,msg:"漂流瓶破损了..."});
				}
				callback({code:1,msg:bottle});
				client.DEL(bottleId);
			});
		});
	});
}



