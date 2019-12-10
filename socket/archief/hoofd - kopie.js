var Kinect2 = require('C:/Users/mudyr/node_modules/kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var canvasHeight = 712;
var canvasWidth = 1141;
var kinect = new Kinect2();
var playerCoordinates = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var lijst = [];


function slow(){
    console.log("SLOW ME DOWN!");
}

io.on('connection', function(socket){
    console.log('client connected');
});
if(kinect.open()) {
    server.listen(8000);
    console.log('Server listening on port 8000');

//functie om een range van getallen te berekenen naar een andere range. Dit gebruiken we om kinect waardes naar bruikbare pixel waardes om te zetten
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
        var Hoofd = 3;
		var Nek = 20;
		
        
		
		for(var i = 0;  i < bodyFrame.bodies.length; i++) {
			if(bodyFrame.bodies[i].tracked) {
                playerCoordinates[i*2] = limitY(bodyFrame.bodies[i].joints[Hoofd].depthY);
                playerCoordinates[(i*2)+1] = limitY(bodyFrame.bodies[i].joints[Nek].depthY);

				
				var verschil = (playerCoordinates[i*2] - playerCoordinates[(i*2)+1]);
				lijst.push = verschil;
				
				
            }
            else {
                playerCoordinates[i*2] = 0;
                playerCoordinates[(i*2) + 1] = 0;
				
            }
			if (lijst.length == 10) {				     
				 lijst.length = 0;

			}
        }
		
        
    };
    console.log(lijst);
    kinect.on('bodyFrame', function(bodyFrame){	
        interpretData(bodyFrame);
        io.sockets.emit('bodyFrame', playerCoordinates);
		
    });
	setTimeout(function(){
		kinect.close();
		console.log("Kinect Closed");
	}, 10000);
	
	
    kinect.openBodyReader();
}
