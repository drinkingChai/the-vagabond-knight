/*
Available models and controllers
player
game
gameController
playerController
*/


var main = function() {

	$('.dragons-lair').hide();

	var slideNum = 0;			//slide number to prevent animating the slide too far, range 0-numer of slides
	var gameStarted = false;	//prevents interacting with objects when false

	$('.go-right').click(function() {
		if (slideNum === 2 || !gameStarted) { return; }	//prevent sliding when reached the end of viewing area or when game has not started
		$('.kingdom').animate({left: "-=600"}, 1000)	//animate the kingdom image 600px to the right
		slideNum++;										//increment slideNum
	});

	$('.go-left').click(function() {
		if (slideNum === 0) { return; }					//prevent sliding when reached the beginning of viewing area
		$('.kingdom').animate({left: "+=600"}, 1000)	//animate kingdom image 600px to the left
		slideNum--;										//decrement slideNum
	});
	
	var openings = $('.narrativeContainer').find($('.opening'));	//finds all the instances of opening narrative
	var currentOpening = 0;											//start from first opening narrative
	$('.next').click(function() {
		$(openings[currentOpening]).hide();							//hide current narrative
		currentOpening++;											//increment currentOpening
		$(openings[currentOpening]).show();							//show the next narrative
	});

	var imageToNarrative = {
		currentlyOpen: false,																							//false when no narratives are open
		imageMap: [$('.library-img'), $('.forge-img'),$('.barracks-img'), $('.gym-img')],								//all clickable objects on image
		narratives: [$('.narrative.library'), $('.narrative.forge'), $('.narrative.barracks'), $('.narrative.gym')],	//narratives in same order as clickable objects in imageMap
		makeInteractive: function($imageSection, $narrative) {
			//takes an imageSection and narrative as input and binds the click to open mapped narrative
			$imageSection.click(function() {
				if (!gameStarted) { return; }									//prevent interaction when game has not started
				if (imageToNarrative.currentlyOpen == $narrative) { return; }	//return if currentlyOpen is the narrative
				$('.narrative').slideUp().delay(300);							//slide the current narrative up
				$narrative.slideDown();											//slide the mapped narrative down
				imageToNarrative.currentlyOpen = $narrative;					//set the mapped narrative as currentlyOpen
			})
		},
		makeAllInteractive: function() {
			//map all items in imageMap to narratives
			for (var i = 0; i < this.imageMap.length; i++) {
				this.makeInteractive(this.imageMap[i], this.narratives[i]);
			} 
		}
	}

	$('.narrative').hide();					//hide all narratives to start
	$('.narrative1').slideDown();			//show first narrative
	imageToNarrative.makeAllInteractive();	//make all objects interactible

	$('.start').click(function() {
		//when start is clicked, hide the narrative
		$('.narrative').slideUp();
		gameStarted = true;					//start the game
	});


	$('.close-nar').click(function() {
		//close the narrative window
		$('.narrative').slideUp();
	});

	$('.close-money').click(function() {
		$('.no-money').slideUp();
	})

	$('.try-again').click(function() {
		//reloads the site
		document.location.reload(true);
	})

	$('.cave-img').click(function() {
		//prompts the player to enter the final battle	
		$('.cave').slideDown();
	})

	$('.boss-fight').click(function() {
		//hides the kingdom and shows the dragon
		$('.narrative').fadeOut();
		$('.kingdom').hide();
		$('.dragons-lair').fadeIn();
	})
	
	//gameplay section
	$('.read-drag-book').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.readDragBook);
		jqView.updatePlayerStats();
		jqView.updateGameStats();
		$(this).fadeOut();
		jqView.showEndMessage();
	});

	$('.read-knight-book').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.readKnightBook);
		jqView.updatePlayerStats();
		jqView.updateGameStats();
		$(this).fadeOut();
		jqView.showEndMessage();
	});

	$('.read-some-anime').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.readAnime);
		jqView.updateGameStats();
		jqView.showEndMessage();
	});

	$('.repair-armor').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.repairArmor);
		jqView.updatePlayerStats();
		jqView.updateGameStats();
		jqView.showEndMessage();
	});

	$('.eavesdrop').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.eavesdrop);
		jqView.updatePlayerStats();
		jqView.updateGameStats();
		$(this).fadeOut();
		jqView.showEndMessage();
	});

	$('.get-fodder').click(function() {
		gotFodder = playerController.addFodder(player.enhanceOpt.fodder);
		if (!gotFodder) {
			//if the player doesn't have enough gold, display this message
			$('.no-money').slideDown();
			return;
		}
		jqView.updatePlayerStats();
	});

	$('.workout').click(function() {
		gameController.updatePlayerAndDay(player.enhanceOpt.workout);
		jqView.updatePlayerStats();
		jqView.updateGameStats();
		jqView.showEndMessage();
	});

	//dragon combat
	$('.strike').click(function() {
		jqView.dragonTakesDamage();
		jqView.playerTakesDamage();
		jqView.showEndMessage();
	});

	$('.guard').click(function() {
		playerController.guard();
		jqView.playerTakesDamage();
		jqView.showEndMessage();
	});

	$('.useFodder').click(function() {
		if (!playerController.useFodder()) {
			//if there is no fodder, display no fodder message
			$('.no-fodder').slideDown();
			return;
		};

		playerController.useFodder();
		jqView.dragonTakesDamage();
		jqView.showEndMessage();
	});

	//create function for player take damage and dragon take damage, which items to update
	var jqView = {
		//jquery view functions
		showEndMessage: function() {
			//checks game condition and displays corresponding message
			var gameEnd = gameController.checkEnd();

			if (gameEnd == "playerWin") {
				$('.playerWin').slideDown();
			} else if (gameEnd == "aiWin") {
				randEnd = Math.floor(Math.random() * 1);
				if (randEnd === 0) {
					$('.aiWin1').slideDown();
				} else {
					$('.aiWin2').slideDown();
				}
			} else if (gameEnd == "playerLose") {
				$('.playerLose').slideDown();
			}

			if (gameEnd) {
				//if game is over, set gameStarted to false to prevent interaction
				gameStarted = false;
			}
		},
		playerTakesDamage: function() {
			gameController.playerTakesDamage();
			this.updatePlayerStats();
		},
		dragonTakesDamage: function() {
			gameController.dragonTakesDamage();
			this.updateDragonStats();
		},
		updatePlayerStats: function() {
			$('.playerHealth').css('width', playerController.playerHealthPercent().toString() + '%');
			$('.playerHealth').html(player.health);
			$('.strength').html(player.strength.toString());
			$('.critical').html(player.critical.toString() + '%');
			$('.fodder').html(player.fodder.toString());
			$('.gold').html(player.gold.toString());
		},
		updateDragonStats: function() {
			$('.dragonHealth').css('width', game.dragonHealthPercent().toString() + '%');
			$('.dragonHealth').html(game.dragonHealth);
		},
		updateGameStats: function() {
			$('.day').html(game.day.toString());
		},
		updateAllSats: function() {
			this.updatePlayerStats();
			this.updateDragonStats();
			this.updateGameStats();
		}
	}
}

$(document).ready(main);