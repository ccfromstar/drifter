var request = require('../node_modules/request');

for(var i=1;i<=10;i++){
	(function(i){
		var _type = (i<6)?"male":"female";
		request.post({
			url:"http://127.0.0.1:3000",
			json:{"owner":"bottle"+i,"type":_type,"content":"content"+i}
		},function(err,res,body){
			console.log(err);
			//console.log(res);
			console.log(body);
		});
	})(i);
}