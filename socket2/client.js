;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var websocket = require('websocket-stream');

var socket = websocket('ws://localhost:3000');


socket.on('bodyFrame', interpretData);


function interpretData(bodyFrame) {
for (i = 0; i < 5; i++){ 

var hand = 0;

 if (bodyFrame[i*3] > bodyFrame[(i*3)+2]) {
    var hand = 1;
	
 }
 if (bodyFrame[(i*3)+1] > bodyFrame[(i*3)+2])
 {
     var hand = 1;
 }
 if (var hand = 1) {
 	 console.log("Je kijkt op je pokkie");
 }
}
}

