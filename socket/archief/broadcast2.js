var Kinect2 = require('C:/Users/mudyr/node_modules/kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
var canvasHeight = 712;
var canvasWidth = 1141;
var kinect = new Kinect2();
var playerCoordinates = [0,0,0,0,0,0,0,0,0,0,0,0];
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

//functie om de x waardes die uit de map functie komen binnen de resolutie van het scherm te houden
   function limitX(x){
        x = Math.round(map(x, 0, 1, canvasWidth, 0));
        if (x < 0 ){
            x = 0;
        }else if (x > canvasWidth){
            x = canvasWidth;
        }
        return(x);
    }

    function limitY(y){
        y = Math.round(map(y, 0.4, 2.35, canvasHeight, 0));
        if (y < 0 ){
            y = 0;
        }else if (y > canvasHeight){
            y = canvasHeight;
        }
        return(y);
    }

    function interpretData(bodyFrame) {
        var limb = 10;
        for (i = 0; i < 5; i++){
            if(bodyFrame.bodies[i].joints !== undefined) {
                playerCoordinates[i*2] = limitX(bodyFrame.bodies[i].joints[limb].depthX);
                playerCoordinates[(i*2)+1] = limitY(bodyFrame.bodies[i].joints[limb].depthY);
            }
            else {
                playerCoordinates[i*2] = 0;
                playerCoordinates[(i*2) + 1] = 0;
            }
        }

        console.log(playerCoordinates);
    };
    kinect.on('bodyFrame', function(bodyFrame){
        interpretData(bodyFrame);
        io.sockets.emit('bodyFrame', playerCoordinates);
    });

    kinect.openBodyReader();
}
