

// The complete broadcast code

var Kinect2 = require('C:/Users/mudyr/node_modules/kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var kinect = new Kinect2();

if(kinect.open()) {
    server.listen(8000);
    console.log('Server listening on port 8000');
    console.log('Point your browser to http://www.webondevices.com');

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

	function interpretData(bodyFrame) {
		for (i = 0; i < 5; i++) {
			if (bodyFrame.bodies[i].joints !== undefined) {
			   console.log(bodyFrame.bodies[i].joints);
			   
			}
		}
	};

    kinect.on('bodyFrame', function(bodyFrame){
		interpretData(bodyFrame.bodies);
        io.sockets.emit('bodyFrame', bodyFrame);
    });

    kinect.openBodyReader();
}

