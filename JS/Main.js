/* Define Canvas */

var canvas;
var stage;
var windowW, windowH;
/* [Graphics] */

/* Background */

var bgImg = new Image();
var bg;
var bg2Img = new Image();
var bg2;
var prImg = new Image();
var pr;
var pr2Img = new Image();
var pr2;

var lv2bgImg = new Image();
var lv2bg;
var lv2bg2Img = new Image();
var lv2bg2;
var lv2prImg = new Image();
var lv2pr;
var lv2pr2Img = new Image();
var lv2pr2;

var logoImg = new Image();
var logo;

var startImg = new Image();
var startButton;

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
var ebltImg = new Image();

/* Alert */

var winImg = new Image();
var loseImg = new Image();
var win;
var lose;

/* Explosion */
var data = {
	images: ["img\spritesheet\explosion.png"],
	frames: {width:64, height:64},
	animations: {
        run: [0, 64]
	}
};
var spriteSheet = new createjs.SpriteSheet(data);
var animation = new createjs.Sprite(spriteSheet, "explode");

/* Variables */

var lives = new Container();
var bullets = new Container();
var enemies = new Container();
var bossHealth = 20;
var score = 0, scoreText;
var levelText, tagText;

var gfxLoaded = 0;
var centerX;
var centerY;
var tkr = new Object();
var timerSource;
var eBullets = new Container();

/* Main */

function Main() {
	/* Link Canvas */

	canvas = document.getElementById('Shooter');
	stage = new Stage(canvas);
	//	canvas.style.backgroundColor = "#000000";
	canvas.style.backgroundColor = "#FFFFFF";

	stage.mouseEventsEnabled = true;

	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;

	windowH = stage.canvas.height;
	windowW = stage.canvas.width;
	centerX = windowW / 2;
	centerY = windowH / 2;


	/* Sound */
	SoundJS.addBatch([
		{ name: 'boss', src: 'sound/boss.mp3', instances: 1 },
		{ name: 'explo', src: 'sound/explo.mp3', instances: 10 },
		{ name: 'shot', src: 'sound/shot.mp3', instances: 10 }]);

	/* Load GFX */

	bgImg.src = 'img/galaxy.jpg';
	bgImg.name = 'bg';
	bgImg.onload = loadGfx;

	bg2Img.src = 'img/galaxy.jpg';
	bg2Img.name = 'bg2';
	bg2Img.onload = loadGfx;

	prImg.src = 'img/bg.png';
	prImg.name = 'pr';
	prImg.onload = loadGfx;

	pr2Img.src = 'img/bg.png';
	pr2Img.name = 'pr2';
	pr2Img.onload = loadGfx;

	// /* Level2 BG */
	// lv2bgImg.src = 'img/galaxy2.jpg';
	// lv2bgImg.name = 'lv2bg';
	// lv2bgImg.onload = loadGfx;

	// lv2bg2Img.src = 'img/galaxy2.jpg';
	// lv2bg2Img.name = 'lv2bg2';
	// lv2bg2Img.onload = loadGfx;

	// lv2prImg.src = 'img/bg2.png';
	// lv2prImg.name = 'lv2pr';
	// lv2prImg.onload = loadGfx;

	// lv2pr2Img.src = 'img/bg2.png';
	// lv2pr2Img.name = 'lv2pr2';
	// lv2pr2Img.onload = loadGfx;



	logoImg.src = 'img/space-verse.png';
	logoImg.name = 'logo';

	startImg.src = 'img/start.png';
	startImg.name = 'startButton';

	sImg.src = 'img/ship.png';
	sImg.name = 'ship';
	sImg.onload = loadGfx;

	eImg.src = 'img/enemy1.png';
	eImg.name = 'enemy';
	eImg.onload = loadGfx;

	bImg.src = 'img/boss.png';
	bImg.name = 'boss';
	bImg.onload = loadGfx;

	ebltImg.src = 'img/ebullet.png';
	ebltImg.name = 'ebullet';

	lImg.src = 'img/live.png';
	lImg.name = 'live';
	lImg.onload = loadGfx;

	bltImg.src = 'img/bullet.png';
	bltImg.name = 'bullet';
	bltImg.onload = loadGfx;

	winImg.src = 'img/win.png';
	winImg.name = 'win';
	winImg.onload = loadGfx;

	loseImg.src = 'img/lose.png';
	loseImg.name = 'lose';
	loseImg.onload = loadGfx;

	startScreen();

	/* Ticker */
	Ticker.setFPS(30);
	Ticker.addListener(stage);

}

function loadGfx(e) {
	if (e.target.name = 'bg') {
		bg = new Shape();
		bg.graphics.beginBitmapFill(bgImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
		//bg = new Bitmap(bgImg); 
	}

	if (e.target.name = 'bg2') {
		bg2 = new Shape();
		bg2.graphics.beginBitmapFill(bg2Img, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	}
	if (e.target.name = 'pr') {
		pr = new Shape();
		pr.graphics.beginBitmapFill(prImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	}

	if (e.target.name = 'pr2') {
		pr2 = new Shape();
		pr2.graphics.beginBitmapFill(pr2Img, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	}

	// /*Level 2 bg */
	// if (e.target.name = 'lv2bg') {
	// 	bg = new Shape();
	// 	bg.graphics.beginBitmapFill(lv2bgImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	// }

	// if (e.target.name = 'lv2bg2') {
	// 	bg2 = new Shape();
	// 	bg2.graphics.beginBitmapFill(lv2bg2Img, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	// }
	// if (e.target.name = 'lv2pr') {
	// 	pr = new Shape();
	// 	pr.graphics.beginBitmapFill(lv2prImg, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	// }

	// if (e.target.name = 'lv2pr2') {
	// 	pr2 = new Shape();
	// 	pr2.graphics.beginBitmapFill(lv2pr2Img, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	// }

	

	//if (e.target.name = 'pr') { pr = new Bitmap(prImg); }

	if (e.target.name = 'ship') { ship = new Bitmap(sImg); }

	//stage.addChild(bg, bg2, pr, pr2);

	gfxLoaded++;

	if (gfxLoaded == 11) {

		//addGameView();
	}
}


function moveShip(e) {
	var moveW = e.stageX;
	if ((moveW >= 30) && (moveW <= (windowW - 50))) {
		ship.x = moveW;
	}
	else {
		checkBound = false;
	}
}

function levelText(getText, taglineText, callback) {
	levelText = new Text('', 'bold 36px Arial', '#FF0000');
	levelText.maxWidth = 1000;
	levelText.textAlign = 'center';
	levelText.x = centerX;
	levelText.y = centerY;
	levelText.text = getText;
	stage.addChild(levelText);

	tagText = new Text('', 'italic 18px Courier New', '#FF0000');
	tagText.maxWidth = 1000;
	tagText.textAlign = 'center';
	tagText.x = centerX;
	tagText.y = levelText.y + 100;
	tagText.text = taglineText;
	stage.addChild(tagText);


	createjs.Tween.get(tagText, { override: true }).wait(5000).to({ alpha: 0, y: (tagText.y + 50), visible: false }, 1000);
	createjs.Tween.get(levelText, { override: true }).wait(5000).to({ alpha: 0, y: (levelText.y - 50), visible: false }, 1000)
		.call(function () {
			stage.removeChild(levelText, tagText);
			callback();
		});

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
	var e = new Bitmap(eImg);

	e.x = Math.floor(Math.random() * Math.floor(windowW));

	e.y = -50

	enemies.addChild(e);
	stage.update();
}



function startScreen() {

	logo = new Bitmap(logoImg);
	//logo = new Shape();
	//logo.graphics.beginBitmapFill(logoImg, 'no-repeat').drawRect(0, 0, canvas.width, canvas.height);
	logo.scaleX = 0.1;
	logo.scaleY = 0.1;

	logo.x = (windowW / 2) - 200;
	logo.y = (windowH / 2) - 200;

	startButton = new Bitmap(startImg);
	startButton.x = logo.x;
	startButton.y = logo.y + 300;

	stage.addChild(logo, startButton);
	stage.update();

	// Button Listeners

	startButton.onPress = function () {
		Tween.get(logo).wait(1000).to({ alpha: 0, visible: false }, 1000);
		Tween.get(startButton).wait(1000).to({ alpha: 0, visible: false }, 1000).call(addGameView);
	};


}

function addGameView() {

	//stage.removeChild(logo);
	clearStage();

	ship.x = centerX
	ship.y = windowH - 50;


	/* Add Lives */
	for (var i = 0; i < 3; i++) {
		var l = new Bitmap(lImg);
		switch (i) {
			case 0:
				l.x = windowW - 140;
				break;
			case 1:
				l.x = windowW - 120;
				break;
			case 2:
				l.x = windowW - 100;
				break;
			default:
				console.log("Issue in life array!");
				break;
		}

		l.y = 50;
		lives.addChild(l);
		stage.update();
	}

	/* Score Text */
	scoreText = new Text('Score: 0', 'bold 14px Courier New', '#FFFFFF');
	scoreText.maxWidth = 1000;
	scoreText.x = 50; /*	location of Scores */
	scoreText.y = 50;

	/* Repeat Background */
	bg2.y = -windowH;
	pr2.y = -windowH;

	/* Add gfx to stage and Tween Ship */
	stage.addChild(bg, bg2, pr, pr2, ship, enemies, bullets, lives, scoreText, eBullets);
	Tween.get(ship).to({ y: windowH - 100 }, 1000).call(startGame);


}

function startGame() {
	stage.onMouseMove = moveShip;
	bg.onPress = shoot;
	bg2.onPress = shoot;

	Ticker.addListener(tkr, false);
	tkr.tick = update;

	timerSource = setInterval('addEnemy()', 3500);
}

function update() {

	/* Move Background */
	bg.y += 2;
	bg2.y += 2;
	pr.y += 3;
	pr2.y += 3;

	if (bg.y >= windowH) {
		bg.y = -windowH;
	}
	else if (bg2.y >= windowH) {
		bg2.y = -windowH;
	}

	if (pr.y >= windowH) {
		pr.y = -windowH;
	}
	else if (pr2.y >= windowH) {
		pr2.y = -windowH;
	}

	/* Move Bullets */
	for (var i = 0; i < eBullets.children.length; i++) {
		eBullets.children[i].y += 10;
		if (eBullets.children[i].y > windowH) {
			eBullets.removeChildAt(i);
		}
	}
	for (var i = 0; i < bullets.children.length; i++) {
		bullets.children[i].y -= 10;
		if (bullets.children[i].y < - 20) {		/* Remove Offstage Bullets */
			bullets.removeChildAt(i);
		}
	}

	/* Show Boss */
	if (score >= 500 && boss == null) {
		boss = new Bitmap(bImg);
		SoundJS.play('boss');
		boss.x = centerX - 90;
		boss.y = -183;
		stage.addChild(boss);
		Tween.get(boss).to({ y: 40 }, 2000)
	}

	/* Move Enemies */
	for (var j = 0; j < enemies.children.length; j++) {
		var randomNumberBetween0and100 = Math.floor(Math.random() * 101);
		var randomNumberBetween0and50 = Math.floor(Math.random() * 51);

		//Enemy Speed
		enemies.children[j].y += 4;
		enemies.children[j].x += 1;
		enemies.children[j].rotation += 2;
		// var randomSpeedRange = Math.floor(Math.random() * 10) - 5;
		// console.log("RandomSpeedRange" + enemies.children[j] +" : " + randomSpeedRange);
		// enemies.children[j].x += randomSpeedRange;


		// while(enemies.children[j].y != windowH){
		//var randomTimeRange = Math.floor(Math.random() * Math.floor(200));
		//console.log("RandomTimeRange: " + randomTimeRange);

		// var m = 0;
		// while(m<2){
		// 	var randomSpeedRange = Math.floor(Math.random() * 10) - 5;
		// 	//console.log("RandomSpeedRange: " + randomSpeedRange);
		// 	enemies.children[j].x += randomSpeedRange;
		// 	m++;
		// }
		// if (m == 500){
		// 	m =0;
		// }


		// }


		if (randomNumberBetween0and100 == 0) {
			eShoot(enemies.children[j]);
		}
		if (boss != null && randomNumberBetween0and50 == 0) {
			bShoot(boss);
		}
		if (enemies.children[j].x > windowW) {
			enemies.children[j].x = 0;
		}

		/* Remove Offstage Enemies */
		if (enemies.children[j].y > windowH) {
			enemies.removeChildAt(j);
		}

		for (var k = 0; k < bullets.children.length; k++) {

			/* Bullet - Enemy Collision */
			if (bullets.children[k].x >= enemies.children[j].x && bullets.children[k].x + 11 < enemies.children[j].x + 49 && bullets.children[k].y < enemies.children[j].y + 40) {
				bullets.removeChildAt(k);
				enemies.removeChildAt(j);
				score += 50;
				stage.update();
				SoundJS.play('explo');
				scoreText.text = "Score: " + score;
			}

			/* Bullet - Boss Collision */
			if (boss != null && bullets.children[k].x >= boss.x && bullets.children[k].x + 11 < boss.x + 183 && bullets.children[k].y < boss.y + 162) {
				bullets.removeChildAt(k);
				bossHealth--;
				score += 50;
				stage.update();
				SoundJS.play('explo');

				scoreText.text = "Score: " + score;
			}
		}

		/* Ship - Enemy Collision */
		if (enemies.hitTest(ship.x, ship.y) || enemies.hitTest(ship.x + 37, ship.y)) {
			enemies.removeChildAt(j);
			lives.removeChildAt(lives.length);

			Tween.get(ship).to({ x: centerX }, 200)
			SoundJS.play('explo');
		}
		for (var b = 0; b < eBullets.children.length; b++) {
			if (eBullets.children[b].x + 10 >= ship.x - 30 && eBullets.children[b].x - 10 < ship.x + 30 && ship.y < eBullets.children[b].y + 20) {
				eBullets.removeChildAt(b);
				lives.removeChildAt(lives.length);

				Tween.get(ship).to({ x: centerX }, 200)
				SoundJS.play('explo');
			}
		}
	}

	/* Check for win */
	if (boss != null && bossHealth <= 0) {
		alert('win');
	}

	/* Check for lose */
	if (lives.children.length <= 0) {
		alert('win');
	}
}

function eShoot(enemy) {
	var c = new Bitmap(ebltImg);

	c.x = enemy.x + 1;
	c.y = enemy.y - 1;

	eBullets.addChild(c);
	stage.update();
}

function bShoot(boss) {
	var randomNumberBetween0and80 = Math.floor(Math.random() * 251);
	var d = new Bitmap(ebltImg);
	d.x = boss.x + randomNumberBetween0and80 - 100;
	d.y = boss.y + 25;
	eBullets.addChild(d);
	stage.update();
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
		// win = new Bitmap(winImg);
		// win.x = centerX;
		// win.y = centerY;
		// stage.addChild(win);
		// stage.removeChild(enemies, boss);

		clearStage();
		levelText("Level 2", "Congrats! but hold on, game just got harder...", level2);

	}
	else {

		clearStage();
		levelText("You LOST!", "Game will restart automatically", reloadGame);

	}

	// bg.onPress = function () { window.location.reload(); };
	// bg2.onPress = function () { window.location.reload(); };
	stage.update();
}

function clearStage() {
	stage.children.forEach(element => {
		Tween.get(element).wait(1000).to({ alpha: 0, visible: false }, 1000);
	});
}

function reloadGame() {

	window.location.reload();

}

function level2() {

	console.log("Level 2 opened");


	Tween.get(ship).to({ alpha: 1, visible: true }, 1000);
	ship.x = centerX
	ship.y = windowH - 50;
	stage.onMouseMove = moveShip;
		

	bglv.onPress = shoot;
	bglv2.onPress = shoot;

	/* Add Lives */
	for (var i = 0; i < 3; i++) {
		var l = new Bitmap(lImg);
		switch (i) {
			case 0:
				l.x = windowW - 140;
				break;
			case 1:
				l.x = windowW - 120;
				break;
			case 2:
				l.x = windowW - 100;
				break;
			default:
				console.log("Issue in life array!");
				break;
		}

		l.y = 50;
		stage.update();
	}
	Tween.get(lives).to({ alpha: 1, visible: true }, 1000);
	stage.addChild(lv2bg, lv2bg2, lv2pr, lv2pr2);

	/* Move Background */
	lv2bg.y += 2;
	lv2bg2.y += 2;
	lv2pr.y += 3;
	lv2pr2.y += 3;

	if (lv2bg.y >= windowH) {
		lv2bg.y = -windowH;
	}
	else if (lv2bg2.y >= windowH) {
		lv2bg2.y = -windowH;
	}

	if (lv2pr.y >= windowH) {
		lv2pr.y = -windowH;
	}
	else if (lv2pr2.y >= windowH) {
		lv2pr2.y = -windowH;
	}

	/* Add gfx to stage and Tween Ship */
	//stage.addChild(bg, bg2, pr, pr2, ship, enemies, bullets, lives, scoreText, eBullets);

}
