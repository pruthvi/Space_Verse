/* Define Canvas */
var canvas; 
var stage;


/* Background */  
var bgImg = new Image(); 
var bg; 
var bg2Img = new Image(); 
var bg2;

  
var sImg = new Image();		/* Ship */
var ship;


var eImg = new Image();		/* Enemy */
  
var bImg = new Image();		/* Boss */
var boss;
 
var lImg = new Image();		/* Lives */

var bltImg = new Image();	/* Bullets */


var lives = new Container(); //stores the lives gfx 
var bullets = new Container(); //stores the bullets gfx 
var enemies = new Container(); //stores the enemies gfx 
var bossHealth = 20; 
var score; 
var gfxLoaded = 0; //used as a preloader, counts the already loaded items 
var centerX = 160; 
var centerY = 240; 
var tkr = new Object(); //used as a Ticker listener 
var timerSource; //references a setInterval method

function Main() 
{ 

/* Link Canvas */
canvas = document.getElementById('Shooter'); 
stage = new Stage(canvas);

stage.mouseEventsEnabled = true;

/* Load GFX */
  
bgImg.src = 'bg.png'; 
bgImg.name = 'bg'; 
bgImg.onload = loadGfx; 
      
bg2Img.src = 'bg2.png'; 
bg2Img.name = 'bg2'; 
bg2Img.onload = loadGfx; 
      
sImg.src = 'ship.png'; 
sImg.name = 'ship'; 
sImg.onload = loadGfx; 
  
eImg.src = 'enemy1.png'; 
eImg.name = 'enemy'; 
eImg.onload = loadGfx; 
  
bImg.src = 'boss.png'; 
bImg.name = 'boss'; 
bImg.onload = loadGfx; 
  
lImg.src = 'live.png'; 
lImg.name = 'live'; 
lImg.onload = loadGfx; 
  
bltImg.src = 'bullet.png'; 
bltImg.name = 'bullet'; 
bltImg.onload = loadGfx; 
  
winImg.src = 'win.png'; 
winImg.name = 'win'; 
winImg.onload = loadGfx; 
  
loseImg.src = 'lose.png'; 
loseImg.name = 'lose'; 
loseImg.onload = loadGfx;


/* Ticker */
  
Ticker.setFPS(30); 
Ticker.addListener(stage);

}