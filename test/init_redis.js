var request = require('../node_modules/request');
/*
for(var i=1;i<5;i++){
	(function(i){
		request.post({
			url:"http://127.0.0.1:3000",
			json:{"owner":"bottle"+i,"type":"male","content":"content"+i}
		},function(err,res,body){
			console.log(err);
			//console.log(res);
			console.log(body);
		});
	})(i);
}
*/
for(var i=6;i<10;i++){
	(function(i){
		request.post({
			url:"http://127.0.0.1:3000",
			json:{"owner":"bottle"+i,"type":"female","content":"content"+i}
		});
	})(i);
}