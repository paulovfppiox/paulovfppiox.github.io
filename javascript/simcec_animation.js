/* 
 * Photoplethysmograph (Real Time PPG Grapher)
 * 
 *    by: Tso (Peter) Chen
 *  
 * 0.1 - first version 
 * Absolutely free to use, copy, edit, share, etc.
 *--------------------------------------------------*/
  
  /*
   * Helper function to convert a number to the graph coordinate
   * ----------------------------------------------------------- */
  function convertToGraphCoord(g, num){
    return (g.height / 2) * -(num * g.scaleFactor) + g.height / 2;
  }

  /*
   * Constructor for the PlethGraph object
   * ----------------------------------------------------------- */
  function PlethGraph(cid, datacb)	{
    var g             =   this;
    g.canvas_id       =   cid;
    g.canvas          =   $("#" + cid);
    g.context         =   g.canvas[0].getContext("2d"); // Acessa contexto Canvas
    g.width           =   $("#" + cid).width();
    g.height          =   $("#" + cid).height();
    g.white_out       =   g.width * 0.01;
    g.fade_out        =   g.width * 0.15;
    g.fade_opacity    =   0.2;
    g.current_x       =   0;
    g.current_y       =   0;
    g.erase_x         =   null;
    g.speed           =   2;
    g.linewidth       =   1.4;
    g.scaleFactor     =   1;
    g.stop_graph      =   false;
    
    g.plethStarted    =   false;
    g.plethBuffer     =   new Array();
    
    /*
     * The call to fill the data buffer using
     * the data callback
     * ---------------------------------------- */
    g.fillData = function() {
      g.plethBuffer = datacb();
    };
      

    /*
     * The call to start the ging
     * ---------------------------------------- */
    g.start = function() {
	
      reqAnimFrame =   window.requestAnimationFrame       ||
                       window.mozRequestAnimationFrame    ||
                       window.webkitRequestAnimationFrame ||
                       window.msRequestAnimationFrame     ||
                       window.oRequestAnimationFrame;
      
      // Recursive call to do animation frames
      if (!g.stop_graph) reqAnimFrame(g.start);
      
      // We need to fill in data into the buffer so we know what to draw
      g.fillData();
      
      // Draw the frame (with the supplied data buffer)
      g.draw();
    };
    
    
    g.draw = function() {
      // Circle back the draw point back to zero when needed (ring drawing)
      g.current_x = (g.current_x > g.width) ? 0 : g.current_x;
      
      // "White out" a region before the draw point
      for( i = 0; i < g.white_out ; i++){
        g.erase_x = (g.current_x + i) % g.width;
        g.context.clearRect(g.erase_x, 0, 1, g.height);
      }
      
      // "Fade out" a region before the white out region
      for( i = g.white_out ; i < g.fade_out ; i++ ){
        g.erase_x = (g.current_x + i) % g.width;
		g.context.shadowColor = "white";
        g.context.fillStyle="rgba(255, 255, 255, " + g.fade_opacity.toString() + ")";
        g.context.fillRect(g.erase_x, 0, 1, g.height);
      }
  
      // If this is first time, draw the first y point depending on the buffer
      if (!g.started) {
        g.current_y = convertToGraphCoord(g, g.plethBuffer[0]);
        g.started = true;
      }
	  
      // Start the drawing
      g.context.beginPath();

      // We first move to the current x and y position (last point)
      g.context.moveTo(g.current_x, g.current_y);
	  
      for (i = 0; i < g.plethBuffer.length; i++) {
        // Put the new y point in from the buffer
        g.current_y = convertToGraphCoord(g, g.plethBuffer[i]);
        
        // Draw the line to the new x and y point
        g.context.lineTo(g.current_x += g.speed, g.current_y);
        
        // Set the 
        g.context.lineWidth   = g.linewidth;
        g.context.lineJoin    = "round";
        
		// Efeitos
		g.context.strokeStyle = '#1cc402';
		g.context.shadowBlur = 10;
	    g.context.shadowColor = "blue";
		
		
        // Create stroke
        g.context.stroke();
      }
      
      // Stop the drawing
      g.context.closePath();
    };
  }
  
  // --------------------------- Noise Demo
  var lastData = 0;
  
  // Create a random function that is dependent on the last value
  function hysteresisRandom(){
    lastData += (Math.floor((Math.random() * 5) + 1)-3)/50;
    if (Math.abs(lastData) >= 1) lastData = (lastData > 0) ? 1 : -1;
    return lastData;
  }

  // Generate a real time data grab of various length
  function generateData(){
    buffer = new Array();
    var inputLength = Math.floor((Math.random() * 1) + 1);;
    for( i = 0 ; i < inputLength ; i++ ) buffer[i] = hysteresisRandom();
    return buffer;
  }
  

  var ECG_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                  0.08, 0.18, 0.08, 0, 0, 0, 0, 0, 0, -0.04, 
                  -0.08, 0.3, 0.7, 0.3, -0.17, 0.00, 0.04, 0.04, 
                  0.05, 0.05, 0.06, 0.07, 0.08, 0.10, 0.11, 0.11, 
                  0.10, 0.085, 0.06, 0.04, 0.03, 0.01, 0.01, 0.01, 
                  0.01, 0.02, 0.03, 0.05, 0.05, 0.05, 0.03, 0.02, 0, 0, 0];
  
  var ECG_idx = 0;
  
  function getECG(){
    if (ECG_idx++ >= ECG_data.length - 1) ECG_idx=0;
    var output = new Array();
    output[0] = ECG_data[ECG_idx] + hysteresisRandom()/10;
    return output;
  }
  var ecg;

  $(document).ready(function()	{
      ecg = new PlethGraph("ecg", getECG);
      ecg.speed = 1.5;
      ecg.scaleFactor = 0.8;
	  ecg.start(); 
  });
