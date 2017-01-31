/* --------- Config these variables ------------*/
var ipaddress = '192.168.1.2';
var port = 8080;
var neuraltalk_path = "/root/neuraltalk2"
var neuraltalk_checkpoint = "/root/neuraltalk2/model/checkpoint_v1.t7_cpu.t7"
var neuraltalk_options = "-batch_size 1 -gpuid -1"
/* ----------------------------------------*/


var fs = require('fs');
var WebSocketServer = require('ws').Server
var ws = new WebSocketServer({host:ipaddress, port:port});
var pathname = __dirname;



ws.on('connection', function(ws) {
    console.log('New connection');

    ws.on('message', function(message) {
        fs.writeFile("img/caption.png", message, 'binary', function(err) {
	   	if(err) {
	        return console.log(err);
	    }});

	    var exec = require('child_process').exec;
		var child;

		var command = "python resize.py"
		child = exec(command,function (error, stdout, stderr) {
      			console.log(stdout);
      			ws.send(stdout);
   			});

		var command = "cd " + neuraltalk_path + "; th " + neuraltalk_path + "/eval.lua -model " +  neuraltalk_checkpoint  + " -image_folder " + pathname + "/img" + neuraltalk_options + " | awk -F'1:' '{print $2}' "
		child = exec(command,function (error, stdout, stderr) {
      			console.log(stdout);
      			ws.send(stdout);
   			});


	});
});


