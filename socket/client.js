var socket = io.connect('http://localhost:8000/');
var hand;
var oudgem;
var lijst = []; //Array voor de hoofd kanteling


socket.on('bodyFrame', interpretData);


function interpretData(bodyFrame) {
	for (i = 0; i < 5; i++){ 

			var verschil = (bodyFrame[(i*6)+3] - bodyFrame[(i*6)+4]); //Reken het verschil uit tussen de hoofd en het bovenlichaam
				
			lijst[lijst.length] = verschil; //Voeg toe aan array
				
			//Wanneer de lijst 10 is, reken het gemiddelde uit van de array 
			if (lijst.length == 10) {	
				//Gemiddelde berekenen
				const som = lijst.reduce((a, b) => a + b, 0);
				var gem = som / 10;
				
				if (bodyFrame[i*6] > bodyFrame[(i*6)+2] || bodyFrame[(i*6)+1] > bodyFrame[(i*6)+2]) {					
					console.log('neen');
					if (oudgem > 0) {
						if (oudgem > gem) {
							console.log('Je kijkt op je pokkie'); 
						} else {
							console.log('Je kijkt niet op je pokkie');
						}
					}
				}
				
				oudgem = gem;
				lijst.length = 0;
			}
			
			
	}
}
		

     




