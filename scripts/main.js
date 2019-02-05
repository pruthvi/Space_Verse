/* Define Canvas */

var canvas;
var stage;

/* Background */

var bgImg = new Image();
var bg;
var bg2Img = new Image();
var bg2;

/* Ship */

var sImg = new Image();
var ship;

/* Enemy */

var eImg = new Image();

/* Boss */

var bImg = new Image();
var boss;

/* Lives */

var lImg = new Image();

/* Bullets */

var bltImg = new Image();

/* Alert */

var winImg = new Image();
var loseImg = new Image();
var win;
var lose;

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

	/* Sound 
	SoundJS.addBatch([{
		name: 'boss',
		src: 'boss.mp3',
		instances: 1
	}, {
		name: 'explo',
		src: 'explo.mp3',
		instances: 10
	}, {
		name: 'shot',
		src: 'shot.mp3',
		instances: 10
	}]);

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
		addGameView();
	}
}

function addGameView() {
	ship.x = centerX - 18.5;
	ship.y = 480 + 34;

	/* Add Lives */

	for (var i = 0; i < 3; i++) {
		var l = new createjs.Bitmap(lImg);

		l.x = 248 + (25 * i);
		l.y = 463;

		lives.addChild(l);
		stage.update();
	}

	/* Score Text */

	score = new Text('0', 'bold 14px Courier New', '#FFFFFF');
	score.maxWidth = 1000; //fix for Chrome 17 
	score.x = 2;
	score.y = 476;

	/* Second Background */

	bg2.y = -480;

	/* Add gfx to stage and Tween Ship */

	stage.addChild(bg);
	stage.addChild(bg2);
	stage.addChild(ship);
	stage.addChild(enemies);
	stage.addChild(bullets);
	stage.addChild(lives);
	//stage.addChild(bg, bg2, ship, enemies, bullets, lives, score);
	createjs.Tween.get(ship).to({
		y: 425
	}, 1000).call(startGame);
}

function moveShip(e) {
	ship.x = e.stageX - 18.5;
}


function shoot() {
	var b = new Bitmap(bltImg);

	b.x = ship.x + 13;
	b.y = ship.y - 20;

	bullets.addChild(b);
	stage.update();

	SoundJS.play('shot');
}

function addEnemy() {
	var e = new createjs.Bitmap(eImg);

	e.x = Math.floor(Math.random() * (320 - 50))
	e.y = -50

	enemies.addChild(e);
	stage.update();
}

function startGame() {
	stage.onMouseMove = moveShip;
	bg.onPress = shoot;
	bg2.onPress = shoot;

	createjs.Ticker.addEventListener(tkr, false);
	tkr.tick = update;

	timerSource = setInterval('addEnemy()', 1000);
}

function update() {
	/* Move Background */

	bg.y += 5;
	bg2.y += 5;

	if (bg.y >= 480) {
		bg.y = -480;
	} else if (bg2.y >= 480) {
		bg2.y = -480;
	}

	/* Move Bullets */

	for (var i = 0; i < bullets.children.length; i++) {
		bullets.children[i].y -= 10;
	}

	/* Move Bullets */

	for (var i = 0; i < bullets.children.length; i++) {
		bullets.children[i].y -= 10;

		/* Remove Offstage Bullets */

		if (bullets.children[i].y < -20) {
			bullets.removeChildAt(i);
		}
	}

	/* Show Boss */

	if (parseInt(score.text) >= 500 && boss == null) {
		boss = new Bitmap(bImg);

		SoundJS.play('boss');

		boss.x = centerX - 90;
		boss.y = -183;

		stage.addChild(boss);
		Tween.get(boss).to({
				y: 40
			}, 2000) //tween the boss onto the play area 
	}

	/* Move Enemies */

	for (var j = 0; j < enemies.children.length; j++) {
		enemies.children[j].y += 5;

		/* Move Enemies */

		for (var j = 0; j < enemies.children.length; j++) {
			enemies.children[j].y += 5;

			/* Remove Offstage Enemies */

			if (enemies.children[j].y > 480 + 50) {
				enemies.removeChildAt(j);
			}

			for (var k = 0; k < bullets.children.length; k++) {
				/* Bullet - Enemy Collision */

				if (bullets.children[k].x >= enemies.children[j].x && bullets.children[k].x + 11 < enemies.children[j].x + 49 && bullets.children[k].y < enemies.children[j].y + 40) {
					bullets.removeChildAt(k);
					enemies.removeChildAt(j);
					stage.update();
					SoundJS.play('explo');
					score.text = parseFloat(score.text + 50);
				}

				/* Bullet - Boss Collision */

				if (boss != null && bullets.children[k].x >= boss.x && bullets.children[k].x + 11 < boss.x + 183 && bullets.children[k].y < boss.y + 162) {
					bullets.removeChildAt(k);
					bossHealth--;
					stage.update();
					SoundJS.play('explo');
					score.text = parseInt(score.text + 50);
				}
			}

			/* Ship - Enemy Collision */

			if (enemies.hitTest(ship.x, ship.y) || enemies.hitTest(ship.x + 37, ship.y)) {
				enemies.removeChildAt(j);
				lives.removeChildAt(lives.length);
				ship.y = 480 + 34;
				Tween.get(ship).to({
					y: 425
				}, 500)
				SoundJS.play('explo');
			}
		}

		/* Check for win */

		if (boss != null && bossHealth <= 0) {
			alert('win');
		}

		/* Check for lose */

		if (lives.children.length <= 0) {
			alert('lose');
		}
	}
}

function alert(e) {
	/* Remove Listeners */

	stage.onMouseMove = null;
	bg.onPress = null;
	bg2.onPress = null;

	Ticker.removeListener(tkr);
	tkr = null;

	timerSource = null;

	/* Display Correct Message */

	if (e == 'win') {
		win = new Bitmap(winImg);
		win.x = centerX - 64;
		win.y = centerY - 23;
		stage.addChild(win);
		stage.removeChild(enemies, boss);
	} else {
		lose = new Bitmap(loseImg);
		lose.x = centerX - 64;
		lose.y = centerY - 23;
		stage.addChild(lose);
		stage.removeChild(enemies, ship);
	}

	bg.onPress = function () {
		window.location.reload();
	};
	bg2.onPress = function () {
		window.location.reload();
	};
	stage.update();
}
