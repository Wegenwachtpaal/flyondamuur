var Kinect2 = require('C:/Users/mudyr/node_modules/kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var canvasHeight = 712;
var canvasWidth = 1141;
var kinect = new Kinect2();
var playerCoordinates = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];




function slow(){
    console.log("SLOW ME DOWN!");
}

io.on('connection', function(socket){
    console.log('client connected');
});

if(kinect.open()) {
    server.listen(8000);
    console.log('Server listening on port 8000');

	    function map (x,  in_min,  in_max,  out_min,  out_max){
        x = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        return (x);
    }

    function limitY(y){
        y = Math.round(map(y, 0.0, 2.35, canvasHeight, 0));
        if (y < 0 ){
            y = 0;
        }else if (y > canvasHeight){
            y = canvasHeight;
        }
        return(y);
    }

    function interpretData(bodyFrame) {
        // Arm
		var rPols = 10;
		var lPols = 6;
        var Buik = 1; 
		// Hoofd
		var Hoofd = 3;
		var Nek = 20;

				
		for(var i = 0;  i < bodyFrame.bodies.length; i++) {
			if(bodyFrame.bodies[i].tracked) {
				
				// Arm
                playerCoordinates[i*6] = limitY(bodyFrame.bodies[i].joints[rPols].depthY);
                playerCoordinates[(i*6)+1] = limitY(bodyFrame.bodies[i].joints[lPols].depthY);
				playerCoordinates[(i*6)+2] = limitY(bodyFrame.bodies[i].joints[Buik].depthY);
				//Hoofd
				playerCoordinates[(i*6)+3] = limitY(bodyFrame.bodies[i].joints[Hoofd].depthY);
                playerCoordinates[(i*6)+4] = limitY(bodyFrame.bodies[i].joints[Nek].depthY);
				//Persoon positie
                // playerCoordinates[(i*6)+5] = bodyFrame.bodies[i].joints[Buik].cameraZ;
			}
            else {
                playerCoordinates[i*6] = 0;
                playerCoordinates[(i*6) + 1] = 0;
				playerCoordinates[(i*6) + 2] = 0;
				playerCoordinates[(i*6) + 3] = 0;
				playerCoordinates[(i*6) + 4] = 0;
				playerCoordinates[(i*6) + 5] = 0;

            }
        }

      
    };
    
    kinect.on('bodyFrame', function(bodyFrame){	
        interpretData(bodyFrame);
        io.sockets.emit('bodyFrame', playerCoordinates);
		
    });

	
	
    kinect.openBodyReader();
}
