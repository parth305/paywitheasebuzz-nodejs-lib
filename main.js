var http = require('http');
var easebuzz = require('easebuzz')
var env = "test"  //USE "live" For PROD Env.
var server = http.createServer(function (req, res) {
	
	var parameters = {
		txnid : 'abc',
		firstname : 'NAME',
		email : 'test@gmail.com',
		phone : '8989898989',
		amount : '10',
		productinfo :'test',
		surl :'http://localhost:8081',
		furl : 'http://localhost:8081',
		hash:'',
		udf1:'1',
		udf2:'2',
		udf3:'3',
		udf4:'4',
		udf5:'5',
		udf6:'',
		udf7:'',
		udf8:'',
		udf9:'',
		udf10:'',
		}
	
    if (req.method.toLowerCase() == 'get') {

	    easebuzz.initiatePayment(res,parameters,env);

    } else if (req.method.toLowerCase() == 'post') {
    	// Response Handling - Can be put in another file
    	easebuzz.validateResponse(req,function(error,response_json){
    		console.log("in callback")
    		console.log(response_json)
    		console.log(error)
    		if(error)
    		{
    			console.log("Hash Mismatch")
					res.writeHead(200, {
            	'Content-Type': 'text/html',
                'Content-Length': 100
		        });
		        res.write("Hash Mismatch.");
		        res.end();

    		}
    		else
    		{
    			if(response_json.status=='success')
    			{
    				message="Transaction Success"
    				console.log("Success")
    				res.writeHead(200, {
	            	'Content-Type': 'text/html',
	                'Content-Length': message.length
			        });
			        res.write(message);
			        res.end();
    			}
    			else if(response_json.status=="failure")
    			{
    				message="Transaction Failed"
    				console.log("Failed")
    				res.writeHead(200, {
	            	'Content-Type': 'text/html',
	                'Content-Length': message.length
			        });
			        res.write(message);
			        res.end();
    			}
    			else if(response_json.status=="userCancelled")
    			{
    				message="User Cancelled"
    				console.log("User Cancelled")
    				res.writeHead(200, {
	            	'Content-Type': 'text/html',
	                'Content-Length': message.length
			        });
			        res.write(message);
			        res.end();
    			}
    		}


    	})	
    	

    	
    	
    }

});

server.listen(8081);
console.log("server listening on 8081");