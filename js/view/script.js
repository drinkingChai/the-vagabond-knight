var view = {
	character: character,
	game: game,
	controller: controller
}


var main = function() {

	$('.dragons-lair').hide();

	var slideNum = 0;			//slide number to prevent animating the slide too far, range 0-(scrollable area/viewing area - 1), as of 11.29.15, it is 0-(1800/600 - 1) = 0-2
	var gameStarted = true;		//prevents interacting with objects when false

	$('.go-right').click(function() {
		if (slideNum === 2 || !gameStarted) { return; }	//prevent sliding when reached the end of viewing area or when game has not started
		$('.kingdom').animate({left: "-=600"}, 1000)	//animate the kingdom image 600px to the right
		slideNum++;	//increment slideNum
	});

	$('.go-left').click(function() {
		if (slideNum === 0) { return; }					//prevent sliding when reached the beginning of viewing area
		$('.kingdom').animate({left: "+=600"}, 1000)	//animate kingdom image 600px to the left
		slideNum--;	//decrement slideNum
	});
	
	var openings = $('.narrativeContainer').find($('.opening'));	//finds all the instances of opening narrative
	var currentOpening = 0;	//start from first opening narrative
	$('.next').click(function() {
		$(openings[currentOpening]).hide();	//hide current narrative
		currentOpening++;	//increment currentOpening
		$(openings[currentOpening]).show();	//show the next narrative
	});

	var imageToNarrative = {
		currentlyOpen: false,	//false when no narratives are open
		imageMap: [$('.library-img'), $('.forge-img'), $('.barracks-img'), $('.gym-img')],	//all clickable objects on image
		narratives: [$('.narrative.library'), $('.narrative.forge'), $('.narrative.barracks'), $('.narrative.gym')],	//narratives in same order as clickable objects in imageMap
		makeInteractive: function($imageSection, $narrative) {
			//takes an imageSection and narrative as input and binds the click to open mapped narrative
			$imageSection.click(function() {
				if (!gameStarted) { return; }	//prevent interaction when game has not started
				if (imageToNarrative.currentlyOpen == $narrative) { return; }	//return if currentlyOpen is the narrative
				$('.narrative').slideUp().delay(300);	//slide the current narrative up
				$narrative.slideDown();	//slide the mapped narrative down
				imageToNarrative.currentlyOpen = $narrative;	//set the mapped narrative as currentlyOpen
			})
		},
		makeAllInteractive: function() {
			//map all items in imageMap to narratives
			for (var i = 0; i < this.imageMap.length; i++) {
				this.makeInteractive(this.imageMap[i], this.narratives[i]);
			} 
		}
	}

	$('.narrative').hide();	//hide all narratives to start
	$('.narrative1').slideDown();	//show first narrative
	imageToNarrative.makeAllInteractive();	//make all objects interactible

	$('.start').click(function() {
		//when start is clicked, hide the narrative
		$('.narrative').slideUp();
		gameStarted = true;	//start the game
	});


	$('.close-nar').click(function() {
		//close the narrative window
		$('.narrative').slideUp();
	});

	$('.try-again').click(function() {
		document.location.reload(true);
	})


	$('.cave-img').click(function() {
		$('.kingdom').hide();
		$('.dragons-lair').fadeIn();
	})
	
	//gameplay section
	$('.read-drag-book').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.readDragBook);
		$('.critical').html(view.character.critical.toString() + '%');
		$('.day').html(view.game.day.toString());
		$(this).fadeOut();
		showEndMessage();
	});

	$('.read-knight-book').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.readKnightBook);
		$('.strength').html(view.character.strength.toString());
		$('.day').html(view.game.day.toString());
		$(this).fadeOut();
		showEndMessage();
	});

	$('.read-some-anime').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.readAnime);
		$('.day').html(view.game.day.toString());
		showEndMessage();
	});

	$('.repair-armor').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.repairArmor);
		$('.gold').html(view.character.gold.toString());
		$('.day').html(view.game.day.toString());
		showEndMessage();
	});

	$('.eavesdrop').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.eavesdrop);
		$('.critical').html(view.character.critical.toString() + '%');
		$('.day').html(view.game.day.toString());
		$(this).fadeOut();
		showEndMessage();
	});

	$('.get-fodder').click(function() {
		gotFodder = view.controller.addFodder(game.enhanceOpt.fodder);
		if (!gotFodder) {
			$('.no-money').slideDown();
			imageToNarrative.currentlyOpen = false;
			return;
		}
		$('.fodder').html(view.character.fodder.toString());
		$('.gold').html(view.character.gold.toString());
	});

	$('.workout').click(function() {
		view.controller.enhanceCharacter(game.enhanceOpt.workout);
		$('.strength').html(view.character.strength.toString());
		$('.day').html(view.game.day.toString());
		showEndMessage();
	});

	//dragon combat
	$('.strike').click(function() {
		view.character.strikeDragon();
		$('.dragonHealth').css('width', view.game.dragonHealthPercent().toString() + '%');
		$('.dragonHealth').html(view.game.dragonHealth);
		
		view.character.takeDamage();
		$('.playerHealth').css('width', view.character.playerHealthPercent().toString() + '%');
		$('.playerHealth').html(view.character.health);

		showEndMessage();
	});

	$('.guard').click(function() {
		view.character.guard();

		view.character.takeDamage();
		$('.playerHealth').css('width', view.character.playerHealthPercent().toString() + '%');
		$('.playerHealth').html(view.character.health);

		showEndMessage();
	});

	$('.useFodder').click(function() {
		view.character.useFodder();
		view.character.strikeDragon();
		view.character.takeDamage();
		$('.dragonHealth').css('width', view.game.dragonHealthPercent().toString() + '%');
		$('.fodder').html(view.character.fodder);
	});

	var showEndMessage = function() {
		var gameEnd = view.game.checkEnd();
		var playerEnd = view.character.playerDead();

		if (gameEnd == "playerWin") {
			$('.playerWin').slideDown();
		} else if (gameEnd == "aiWin") {
			randEnd = Math.floor(Math.random() * 1);
			if (randEnd === 0) {
				$('.aiWin1').slideDown();
			} else {
				$('.aiWin2').slideDown();
			}
		} else if (playerEnd) {
			$('.playerLose').slideDown();
		}

		if (gameEnd || playerEnd) {
			gameStarted = false;
		}
	}

}

$(document).ready(main);