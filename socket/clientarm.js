var socket = io.connect('http://localhost:8000/');


socket.on('bodyFrame', interpretData);


function interpretData(bodyFrame) {
for (i = 0; i < 5; i++){ 
 if (bodyFrame[i*3] > bodyFrame[(i*3)+2]) {
    
	console.log("je kijk op je pokkie");
 }
 if (bodyFrame[(i*3)+1] > bodyFrame[(i*3)+2])
 {
     console.log("je kijk op je pokkie");
 }

}

}
		

     




