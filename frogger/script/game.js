 $(document).ready(function(){

 	// CANVAS
 	canvas = document.getElementById("game");
 	width = canvas.width;
 	height = canvas.height;
	ctx = canvas.getContext("2d");

	// IMAGES
	sprite = new Image();
	sprite.src = "assets/frogger_sprites.png";
	dead_frog = new Image();
	dead_frog.src = "assets/dead_frog.png";
	
	// OBSTACLES
	obstacles = new Array();
	numObstacles = 11;
	water = {'x': 0, 'y':[110, 144.5, 179, 213.5, 248], 'w': 399, 'h': 34.5};
	row = 4;
	floating = false;

	// AUDIO
	froggerdies = document.createElement('audio');
	froggerdies.setAttribute('src', 'sounds/froggerdies.ogg');
	froggerjumps = document.createElement('audio');
	froggerjumps.setAttribute('src', 'sounds/froggerjumps.ogg');
	/*
	froggerjumps.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	*/

	// FROG VARIABLES
	frogDirection = 3;
	frogX = 185.5;
    frogY = 495;
    frogW = 28;
    frogH = 21;
	
	// SCORING
	score = 0;
	highscore = 0;
	lives = 3;
	level = 1;
	numWinFrogs = 0;
	posWinFrogs = new Array();
	winFrogs = new Array();

	// TIMER
	timer = 3000;
	timerwidth = 100;

	// BEGIN GAME
	startGame();
	
	function startGame() 
	{
		positionObstacles();
		gameLoop = setInterval(draw, 20);
		//fly = setInterval(drawfly, 300);
	}
	
	function drawCanvas() 
	{
		ctx.fillStyle="#191970";
		ctx.fillRect(0,0,399,282.5);		// lake
		ctx.fillStyle="#000";	
		ctx.fillRect(0,282.5,399,282.5);		// road
		
		ctx.drawImage(sprite,0,117,399,38,0,278.5,399,38);  // purple
		ctx.drawImage(sprite,0,117,399,38,0,490,399,38);  // purple	
		ctx.drawImage(sprite,0,8,399,110,0,8,399,110);    // title
	}
	
	function positionObstacles() 
	{
		for (i = 0; i < 10; i++) 
		{
			obstacles[i] = new Object();
		}
		obstacles[0] = {'num': 4, 'xcoords': [0, 130, 290, 390], 'vel': 1.4, 'y': 110, 'w': 84, 'h': 34.5, 'sx': 8, 'sy': 228};
		obstacles[1] = {'num': 6, 'xcoords': [width, width+38, width+(38*2), 100, 100+38, 100+(38*2)], 
																 'vel': -1, 'y': 144.5, 'w': 38, 'h': 34.5, 'sx': 8, 'sy': 405};
		obstacles[2] = {'num': 2, 'xcoords': [0, 320], 'vel': .6, 'y': 179, 'w': 177, 'h': 34.5, 'sx': 8, 'sy': 163};
		obstacles[3] = {'num': 9, 'xcoords': [40, 40+38, 40+(38*2), 200, 200+38, 200+(38*2), 340, 340+38, 340+(38*2)], 
													   'vel': -.3, 'y': 213.5, 'w': 38, 'h': 34.5, 'sx': 8, 'sy': 405};
		obstacles[4] = {'num': 3, 'xcoords': [-20, 210, 400], 'vel': 1, 'y': 248, 'w': 116, 'h': 34.5, 'sx': 8, 'sy': 195};
		obstacles[5] = {'num': 4, 'xcoords': [10, 100, 250, width], 'vel': -.9, 'y': 320, 'w': 24, 'h': 30, 'sx': 82, 'sy': 262};
		obstacles[6] = {'num': 5, 'xcoords': [0, 240, 120, 240, 380], 'vel': .5, 'y': 350, 'w': 24, 'h': 30, 'sx': 42, 'sy': 292};
		obstacles[7] = {'num': 3, 'xcoords': [width, 60, 320], 'vel': -.85, 'y': 380, 'w': 45, 'h': 30, 'sx': 107, 'sy': 290};
		obstacles[8] = {'num': 3, 'xcoords': [-20, 230, 320], 'vel': .7, 'y': 420, 'w': 26, 'h': 30, 'sx': 48, 'sy': 262};
		obstacles[9] = {'num': 4, 'xcoords': [40, 120, 280, width], 'vel': -.5, 'y': 455, 'w': 27, 'h': 30, 'sx': 10, 'sy': 262};
	}
        
    function draw() 
    {
    	drawCanvas();
       	drawObstacles();
        checkFloat();
       	drawFrogger();
       	checkWin();
       	drawWinFrogs();
       	scoreBoard();
       	updateTimer();
    }

    function drawfly()
    {
    	flyX = 0;
    	flyY = 0;
    	while (true) {
   			pos = getRandomArbitary(0, 5);
			if (winFrogs[pos] != "full") {
				if (pos == 0)
					flyX = 10;
				if (pos == 1)
					flyX = 110;
				if (pos == 2)
					flyX = 190;
				if (pos == 3)
					flyX = 270;
				else
					flyX = 350;
				break;
			}
		}
   		ctx.drawImage(sprite,137,234,20,20,flyX,75,27,22);
    }

    function getRandomArbitary (min, max) {
   		return Math.random() * (max - min) + min;
	}

    function checkFloat() {
    	if (floating && frogY < 282.5) {
			frogX = frogX + obstacles[row]['vel'];	// frog moves with object
			if (frogX > width || frogX < 0)			// check if frogger goes off the board
				deadfrog();
		}
		else {
			floating = false;
		}
    }

    function drawFrogger() 
    {
    	if (frogDirection == 3)
    		ctx.drawImage(sprite,14,367,20,20,frogX,frogY,20,20);
    	if (frogDirection == 2)
    		ctx.drawImage(sprite,82,367,20,20,frogX,frogY,20,20);
    	if (frogDirection == 1)
    		ctx.drawImage(sprite,82,338,20,20,frogX,frogY,20,20);
    	else if (frogDirection == 0)
    		ctx.drawImage(sprite,14,336,20,20,frogX,frogY,20,20);
    }

	function drawObstacles() 
	{		
		position = 0;
		for(i = 0; i < obstacles.length; i++) 
		{
			for (j = 0; j < obstacles[i]['num']; j++) 
			{
				position = obstacles[i]['xcoords'][j] + obstacles[i]['vel'];
				position = onBoard(i, position);
				obstacles[i]['xcoords'][j] = position;
				ctx.drawImage(sprite,obstacles[i]['sx'],obstacles[i]['sy'],obstacles[i]['w'],obstacles[i]['h'],
									 obstacles[i]['xcoords'][j],obstacles[i]['y'],obstacles[i]['w'],obstacles[i]['h']); 
				if (i >= 5) 
				{
					carCollision(i, j, 0);
				}
			}
		}
	}

	function onBoard(index, position) 
	{
		if (obstacles[index]['vel'] > 0) 
		{
			if ((position - obstacles[index]['w']) > width) 
			{
				position = (0 - obstacles[index]['w']);
			}
		}
		if (obstacles[index]['vel'] < 0) 
		{
			if ((position + obstacles[index]['w']) < 0) 
			{
				position = (width + obstacles[index]['w']);
			}
		}
		return position;
	}


	function waterCollision() 
	{
		var counter = 0;
		if (frogY < 282.5) 
		{
			determineRow();
			for (k = 0; k < obstacles[row]['num']; k++) 
			{
				if (noCollision(row, k, frogW))
					counter++;
			}
			if (row == 0) {
				if (frogY < 110) {
					counter = 0;
				}
			}
			if (counter == obstacles[row]['num']) {
				deadfrog();
			}
			else {
				floating = true;
			}
		}
	}

	function determineRow() {
		if (frogY < (water['y'][0] + water['h']) && frogY >= water['y'][0])
			row = 0;
		if (frogY < (water['y'][1] + water['h']) && frogY >= water['y'][1])
			row = 1;
		if (frogY < (water['y'][2] + water['h']) && frogY >= water['y'][2])
			row = 2;
		if (frogY < (water['y'][3] + water['h']) && frogY >= water['y'][3])
			row = 3;
		if (frogY < (water['y'][4] + water['h']) && frogY >= water['y'][4])
			row = 4;
	}

	function carCollision(i, j, frogWidth) 
	{
		if (noCollision(i, j, frogWidth))
		{
			return;
		}
    	else 
    	{
			deadfrog();
		}
	}

	function noCollision(i, j, frogWidth) 
	{
		if ((frogX > (obstacles[i]['xcoords'][j] + obstacles[i]['w']) - 1) || 
        	(frogY > (obstacles[i]['y'] + obstacles[i]['h']) - 1) || 
        	((obstacles[i]['xcoords'][j]+frogWidth) > (frogX + frogW) - 1) || 
        	(obstacles[i]['y'] > (frogY + frogH - 1)))
		{
			return true; // no collision has occurred
		}
		else 
		{
			return false; // the objects are intersecting
		}
	}

	function deadfrog() 
	{
		froggerdies.play();
		ctx.drawImage(dead_frog,0,0,30,30,frogX,frogY,30,30); // draw death png
    	lives--;
    	frogX = 185.5;
   		frogY = 495;
   		floating = false;
	}
	
	$(document).keydown(function(event) 
	{
		if (playing()) 
		{
			froggerjumps.play();
			frogOldX = frogX;
			frogOldY = frogY;
			switch(event.keyCode)
			{
	        	case 39: 				// right arrow
	        		frogX = frogX + 28;
	        		if (frogX >= width) {
	                    frogX = frogOldX;
	                }
	                frogDirection = 0;
	                drawFrogger();
	                break;
	        	case 37: 				// left arrow
	        		frogX = frogX - 28;
	                if (frogX <= 0) {
	                    frogX = frogOldX;
	                }
	                frogDirection = 1;
	                drawFrogger();
	                break;
	        	case 40: 				// down arrow
	        		frogY = frogY + 35;
	        		if (frogY >= (height-35)) {
	        			frogY = frogOldY;
	        		}
	        		frogDirection = 2;
	        		drawFrogger();
	        		break;
	        	case 38: 				// up arrow
	        		frogY = frogY - 35;
	        		addPoints(10);
	        		if (frogY <= 75) {
	        			frogY = 75;
	        		}
	        		frogDirection = 3;
	        		drawFrogger();
	        		break;
	        }
    	}
    	waterCollision();
    });

 	function playing() 
 	{
 		if (timer == 0) 
 		{
 			return false;
 		}
 		if (lives > 0) 
 		{
 			return true;
 		}
 		else
 			return false;
 	}

    function addPoints(number) 
    {
    	score = score + number;
    }

    function checkWin() 
    {
    	if (playing()) 
    	{
    		if (frogY < 110) 
    		{
    			if (winningSpot()) 
    			{
    				addPoints(50);
    				posWinFrogs[numWinFrogs] = frogX;
    				numWinFrogs++;
    				frogY = 495;
    			}
    			else 
    			{
    				deadfrog();
    			}
    		}
    		if (numWinFrogs == 5) 
    		{
    			addPoints(1000);
    			numSecs = ((timer * 20) / 1000);
    			addPoints(numSecs * 10);
    			levelUp();
    			numWinFrogs = 0;
    			timer = 1500;
    		}
    		drawLives();
    	}
    	else 
    	{
    		endGame();
    	}
    }

    function winningSpot() 
    {
    	if (frogX > 5 && frogX < 28 && winFrogs[0] != "full") 
    	{
    		winFrogs[0] = "full";
    		return true;
    	}
    	if (frogX > 100 && frogX < 128 && winFrogs[1] != "full") 
    	{
    		winFrogs[1] = "full";
    		return true;
    	}
    	if (frogX > 180 && frogX < 208 && winFrogs[2] != "full") 
    	{
			winFrogs[2] = "full";
			return true;
		}
    	if (frogX > 260 && frogX < 288 && winFrogs[3] != "full") 
    	{
    		winFrogs[3] = "full";
    		return true;
    	}
    	if (frogX > 340 && frogX < 368 && winFrogs[4] != "full") 
    	{
    		winFrogs[4] = "full";
    		return true;
    	}
    	else
    		return false;
    }

    function drawWinFrogs() 
    {
    	for (i = 0; i < numWinFrogs; i++) 
    	{
    		ctx.drawImage(sprite,82,367,20,21,posWinFrogs[i],75,20,21);
    	}
    }

  	function scoreBoard()
	{
		ctx.font="bold 20px Arial";
		ctx.fillStyle="00FF00";
		ctx.fillText("Level "+ level,50,545);
		ctx.font="bold 12px Arial";
		ctx.fillText("Score: "+ score,10,560);
		ctx.fillText("Highscore: " + highscore,100,560);
	} 

	function drawLives()
	{
		if (lives > 2) 
		{
			ctx.drawImage(sprite,5,330,24,28,15,524,24,28);		
		}
		if (lives > 1) 
		{
			ctx.drawImage(sprite,5,330,24,28,-5,524,24,28);
		}
	}

	function updateTimer() 
	{
		timer--;
		if (timer % 30 == 0) 
		{
			timerwidth--; 
		}
		ctx.fillStyle="FFF";
		ctx.fillText("Time", 360, 550);
		ctx.fillStyle="#CD00CD";
		ctx.fillRect(250,540,100,10);
		ctx.fillStyle="#00FF00";
		ctx.fillRect(250,540,timerwidth,10);
		if (timer == 0) 
		{
			endGame();
		}
	}

	function levelUp() {
		level++;
		for (i = 0; i < obstacles.length; i++) 
		{
			obstacles[i]['vel'] = obstacles[i]['vel'] * 1.5;
		}
	}
        
    function endGame()
    {
		clearInterval(gameLoop);
		ctx.font="bold 30px Arial";
		ctx.fillStyle="00FF00";
		ctx.fillText("Game Over", 130, 308);
		gameover = document.createElement('audio');
		gameover.setAttribute('src', 'sounds/gameover.ogg');
		gameover.play();
		sendscore();
	}

	function sendscore()
	{
		/*
	    //testwindow = window.open("", "scorereport", "location=1,status=1,scrollbars=1,width=100,height=100");
	    var myForm = '<p>Please enter your username:</p><form name="enter" action="send" method="post">Username: <input type="text" name="username><input type="submit" value="Submit"></form>'
		myForm.onsubmit = function() {
    		var w = window.open('about:blank','Popup_Window','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=400,height=300,left = 312,top = 234');
    		this.target = 'Popup_Window';
		};
		*/
		var data = new Object();
	    data.username = 'mccall';
	    data.created_at = new Date;
	    data.score = score;
	    data.game_title = "frogger";

	    $.post('www.high-scores.herokuapp.com/submit.json', data, function(data){
    		console.log(data);
  		}, "json");
	}

 });
