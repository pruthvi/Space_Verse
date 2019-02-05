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

var winImg = new Image();

var loseImg = new Image();

var lives = new createjs.Container(); //stores the lives gfx 
var bullets = new createjs.Container(); //stores the bullets gfx 
var enemies = new createjs.Container(); //stores the enemies gfx 
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
stage = new createjs.Stage(canvas);

stage.mouseEventsEnabled = true;

/* Load GFX */
  
bgImg.src = 'img/bg.png'; 
bgImg.name = 'bg'; 
bgImg.onload = loadGfx; 
      
bg2Img.src = 'img/bg2.bmp'; 
bg2Img.name = 'bg2'; 
bg2Img.onload = loadGfx; 
      
sImg.src = 'img/ship.bmp'; 
sImg.name = 'ship'; 
sImg.onload = loadGfx; 
  
eImg.src = 'img/enemy1.bmp'; 
eImg.name = 'enemy'; 
eImg.onload = loadGfx; 
  
bImg.src = 'img/boss.bmp'; 
bImg.name = 'boss'; 
bImg.onload = loadGfx; 
  
lImg.src = 'img/live.bmp'; 
lImg.name = 'live'; 
lImg.onload = loadGfx; 
  
bltImg.src = 'img/bullet.bmp'; 
bltImg.name = 'bullet'; 
bltImg.onload = loadGfx; 
  
winImg.src = 'img/win.bmp'; 
winImg.name = 'win'; 
winImg.onload = loadGfx; 
  
loseImg.src = 'img/lose.bmp'; 
loseImg.name = 'lose'; 
loseImg.onload = loadGfx;


/* Ticker */
  
createjs.Ticker.setFPS(30); 
createjs.Ticker.addEventListener(stage);

}

function loadGfx(e) {
	if (e.target.name = 'bg') {
		bg = new createjs.Bitmap(bgImg);
	}
	if (e.target.name = 'bg2') {
		bg2 = new createjs.Bitmap(bg2Img);
	}
	if (e.target.name = 'ship') {
		ship = new createjs.Bitmap(sImg);
	}

	gfxLoaded++;

	if (gfxLoaded == 9) {
		//addGameView();
	}
}
