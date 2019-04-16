/* Define Canvas */
var canvas;
var stage;
var windowW, windowH;

/* Background */
var bgImg = new Image();
var bg;
var bg2Img = new Image();
var bg2;
var prImg = new Image();
var pr;
var pr2Img = new Image();
var pr2;

var bgSpeed;
var enemyY;
var enemyX;
var enemyR;
var levelName;

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
var eBulletImg;
var bltImg = new Image();
var ebltImg = new Image();
var e2bltImg = new Image();


/* Alert */
var winImg = new Image();
var loseImg = new Image();
var win;
var lose;
var lives = new Container();
var bullets = new Container();
var eBullets = new Container();
var enemies = new Container();
var bossHealth = 20;
var showBossAt;

var score = 0, scoreText;
var levelText, tagText;

var centerX;
var centerY;
var tkr = new Object();
var timerSource;


function Main() {

	/* Link Canvas */
	canvas = document.getElementById('Shooter');
	stage = new Stage(canvas);
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
		{ name: "bgm", src: "sound/bgm.mp3", instances: 1 },
		{ name: 'boss', src: 'sound/boss.mp3', instances: 1 },
		{ name: 'explo', src: 'sound/explo.mp3', instances: 10 },
		{ name: 'shot', src: 'sound/shot.mp3', instances: 10 }]);


	bgImg.src = 'img/galaxy.jpg';
	bgImg.name = 'bg';

	prImg.src = 'img/bg.png';
	prImg.name = 'pr';


	lv2bgImg.src = 'img/galaxy2.jpg';
	lv2bgImg.name = 'lv2bg';
	lv2prImg.src = 'img/bg2.png';
	lv2prImg.name = 'lv2pr';


	logoImg.src = 'img/space-verse.png';
	logoImg.name = 'logo';

	startImg.src = 'img/start.png';
	startImg.name = 'startButton';

	sImg.src = 'img/ship.png';
	sImg.name = 'ship';

	eImg.src = 'img/enemy1.png';
	eImg.name = 'enemy';

	bImg.src = 'img/boss.png';
	bImg.name = 'boss';

	ebltImg.src = 'img/ebullet.png';
	ebltImg.name = 'ebullet';

	e2bltImg.src = 'img/e2bullet.png';
	e2bltImg.name = 'e2bullet';


	lImg.src = 'img/live.png';
	lImg.name = 'live';

	bltImg.src = 'img/bullet.png';
	bltImg.name = 'bullet';
	

	startScreen();

	/* Ticker */
	Ticker.setFPS(30);
	Ticker.addListener(stage);

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



function LifeAndScore() {

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
	scoreText.x = 50;			 /*	location of Scores */
	scoreText.y = 50;
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

function clearStage() {

	// stage.children.forEach(element => {
	// 	Tween.get(element).wait(1000).to({ alpha: 0, visible: false }, 1000).call(clean);
	// });
	stage.removeAllChildren();
	stage.update();
	console.log("Clear?");
}

function reloadGame() {
	window.location.reload();
}

function startScreen() {

	logo = new Bitmap(logoImg);
	logo.name = "LOGO";
	logo.scaleX = 0.1;
	logo.scaleY = 0.1;
	logo.x = (windowW / 2) - 200;
	logo.y = (windowH / 2) - 200;

	startButton = new Bitmap(startImg);
	startButton.name = "Start Button";
	startButton.x = logo.x;
	startButton.y = logo.y + 300;

	stage.addChild(logo, startButton);
	stage.update();

	startButton.onPress = function () {
		Tween.get(logo).wait(1000).to({ alpha: 0, visible: false }, 1000);
		Tween.get(startButton).wait(1000).to({ alpha: 0, visible: false }, 1000).call(level1);
	};
}


function level1() {

	levelName = "Level 1";
	setup(bgImg, prImg, sImg);

	Ticker.addListener(tkr, false);
	bgSpeed = 2;
	enemyY = 4;
	enemyX = 1;
	enemyR = 2;
	eBulletImg = ebltImg;
	showBossAt = 500;

	tkr.tick = update;
	timerSource = setInterval('addEnemy(eImg)', 3500);

}


function setup(backImage, overlayImage, shipImage) {

	clearStage();

	bg = new Shape();
	bg.graphics.beginBitmapFill(backImage, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	bg.name = "Background";
	bg2 = new Shape();
	bg2.graphics.beginBitmapFill(backImage, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	bg2.name = "Background Repeat";
	pr = new Shape();
	pr.graphics.beginBitmapFill(overlayImage, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	pr.name = "Overlay";
	pr2 = new Shape();
	pr2.graphics.beginBitmapFill(overlayImage, 'repeat').drawRect(0, 0, canvas.width, canvas.height);
	pr2.name = "Overlay Repeat";

	ship = new Bitmap(shipImage);
	ship.name = "Player";
	ship.x = centerX
	ship.y = windowH - 50;

	/* Repeat Background */
	bg2.y = -windowH;
	pr2.y = -windowH;

	LifeAndScore();

	stage.addChild(bg, bg2, pr, pr2, ship, enemies, bullets, lives, scoreText, eBullets);
	Tween.get(ship).to({ y: windowH - 100 }, 1000);

	stage.onMouseMove = moveShip;
	bg.onPress = shoot;
	bg2.onPress = shoot;
	SoundJS.play('bgm');

}


function update() {

	/* Move Background */
	bg.y += bgSpeed;
	bg2.y += bgSpeed;
	pr.y += bgSpeed * 1.5;
	pr2.y += bgSpeed * 1.5;

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
	if (score >= showBossAt && boss == null) {
		boss = new Bitmap(bImg);
		SoundJS.play('boss');
		boss.x = centerX - 90;
		boss.y = -183;
		stage.addChild(boss);
		Tween.get(boss).to({ y: 40 }, 2000);
		bltImg.src = 'img/nBullet.png';
	}


	/* Move Enemies */
	for (var j = 0; j < enemies.children.length; j++) {
		var randomNumberBetween0and100 = Math.floor(Math.random() * 101);
		var randomNumberBetween0and50 = Math.floor(Math.random() * 51);

		//Enemy Speed
		enemies.children[j].y += enemyY;
		enemies.children[j].x += enemyX;
		enemies.children[j].rotation += enemyR;

		if (randomNumberBetween0and100 == 0) {
			eShoot(enemies.children[j], eBulletImg);
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
			// var en = bullets.children[k].localToLocal(0, 0, enemies.children[j]);
			// if (enemies.children[j].hitTest(en.x, en.y)) {
			// 	bullets.removeChildAt(k);
			// 	enemies.removeChildAt(j);
			// 	score += 50;
			// 	stage.update();
			// 	SoundJS.play('explo');
			// 	scoreText.text = "Score: " + score;
			// }

			if (bullets.children[k].x >= enemies.children[j].x &&
				bullets.children[k].x + 11 < enemies.children[j].x + 49 &&
				bullets.children[k].y < enemies.children[j].y + 40) {
				bullets.removeChildAt(k);
				enemies.removeChildAt(j);
				score += 50;
				stage.update();
				SoundJS.play('explo');
				scoreText.text = "Score: " + score;
			}

			/* Bullet - Boss Collision */

			// var bs = bullets.children[k].localToLocal(0, 0, boss);
			// if (boss.hitTest(bs.x, bs.y)) {
			// 	bullets.removeChildAt(k);
			// 	bossHealth--;
			// 	score += 50;
			// 	stage.update();
			// 	SoundJS.play('explo');
			// 	scoreText.text = "Score: " + score;
			// }

			if (boss != null && bullets.children[k].x >= boss.x
				&& bullets.children[k].x + 11 < boss.x + 183
				&& bullets.children[k].y < boss.y + 162)
			{
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
			if (eBullets.children[b].x + 10 >= ship.x - 30
				&& eBullets.children[b].x - 10 < ship.x + 30
				&& ship.y < eBullets.children[b].y + 20) {
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
		alert('lose');
	}
}

function shoot() {
	var b = new Bitmap(bltImg);
	b.x = ship.x + 13;
	b.y = ship.y - 20;

	bullets.addChild(b);
	stage.update();
	SoundJS.play('shot');
}

function addEnemy(image) {
	var e = new Bitmap(image);
	e.x = Math.floor(Math.random() * Math.floor(windowW));
	e.y = -50;
	enemies.addChild(e);
	stage.update();
}

function eShoot(enemy, bulletImage) {
	var c = new Bitmap(bulletImage);

	c.x = enemy.x + 1;
	c.y = enemy.y - 1;

	eBullets.addChild(c);
	stage.update();
}

function bShoot(boss) {
	var randomNumberBetween0and80 = Math.floor(Math.random() * 251);
	var d = new Bitmap(ebltImg);
	d.x = boss.x + randomNumberBetween0and80 - 100;
	d.y = boss.y;
	eBullets.addChild(d);
	stage.update();
}

function alert(e) {
	/* Remove Listeners */

	stage.onMouseMove = null;
	bg.onPress = null;
	bg2.onPress = null;
	
	tkr = null;
	Ticker.removeListener(tkr);


	timerSource = null;

	/* Display Correct Message */
	if (e == 'win') {
		stage.removeChild(boss);
		eImg.src = 'img/enemy11.png';
		bImg.src = 'img/boss1.png';
		ebltImg.src = 'img/e2bullet.png'
		SoundJS.play('bgm');
		if(levelName == 'Level 1'){
			levelText("Level 2", "Congrats! but hold on, game just got harder...", level_2);
		}
		else{
			levelText("YOU WON!", "Congrats! you won the game", reloadGame);
		}
		// switch (levelName) {
		// 	case "Level 1":
		// 		levelText("Level 2", "Congrats! but hold on, game just got harder...", level_2);
		// 		break;
		// 	case "Level 2":
		// 		levelText("YOU WON!", "Congrats! you won the game", reloadGame);
		// 		// console.log("What makes you think you are in level 3?");
		// 		break;
		// 	default:
		// 		console.log("Level Name not found!");
		// 		break;
		// }
	}
	else {
		clearStage();
		levelText("You LOST!", "Game will restart automatically", reloadGame);
	}

	stage.update();
}


function level_2() {

	console.log("Level 2 opened");

	levelName = "Level 2";
	boss = null;
	bossHealth = 20;
	showBossAt = 1000;
	score = 0;
	setup(lv2bgImg, lv2prImg, sImg);

	Ticker.addListener(tkr);
	bgSpeed = 3;
	enemyY = 6;
	enemyX = 2;
	enemyR = 4;
	eBulletImg = e2bltImg;

	tkr.tick = update;
	timerSource = setInterval('addEnemy(eImg)', 500);

}
