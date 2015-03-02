#!/usr/bin/env node

var opc_client = require('open-pixel-control');
var b = require('bonescript');

var xlen = 10,    // Size of grid
    ylen = 10,
    xdir = 1,     // Direction ball is traveling
    ydir = -1,
    color = [127, 0, 0],  // Color of ball (RGB)
    bgnd = [0, 0, 0],     // Color of background
    grid = new Array(xlen*ylen),  // Playing field
    ms   = 100,   // Time (in ms) between moves
    pin  = 'P9_42';   // Pin with the reverse button
    zone = 2;     // Size of zone where reverse will occur
    
var x = 0,        // Current location
    y = ylen/2;
    
b.pinMode(pin, b.INPUT);    // Set pin to be INPUT

b.attachInterrupt(pin, true, b.RISING, reverse);  // Call reverse() whenever button is pressed

function reverse() {
  if(x<zone || x>xlen-zone-1) {   // If in the zone, reverse
  xdir = -xdir;
  }
}

// Initialize the grid of LEDs
for(var i=0; i<grid.length; i++) {
  grid[i] = bgnd;
}

// Connect to opc client
var client = new opc_client({
  address: 'localhost',
  port: 7890
});

client.on('connected', function() {   // Do this connected
  console.log("Connected");
  var strip = client.add_strip({
    length: xlen*ylen
  });

// Here's how you move the ball
  function moveBall() {
    grid[x*xlen+y] = bgnd;    // Turn off ball in present location
    x += xdir;                // Move in the current direction
    if(x<0 || x>xlen-1) {     // See if you have fallen off either edge
      x = xlen/2;             // If so, restart in middle
    }
    grid[x*xlen+y] = color;   // Draw ball in new location
    client.put_pixels(strip.id, grid);  // Display the grid
    setTimeout(moveBall, ms); // Schedule the next ball move
  }
  
  moveBall(); // Start the ball moving
  
});

client.connect(); // Connect to the OPC server and start things moving
