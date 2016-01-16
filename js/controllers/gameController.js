//game controller

var gameController = {
	updatePlayerAndDay: function(enahanceOpt) {
		//updates player and day
		//takes into input enhanceOpt from player from characters
		for (var opt in enahanceOpt) {
			if (opt in game) {
				game[opt] += enahanceOpt[opt];
			}
			else if (opt in player) {
				player[opt] += enahanceOpt[opt];
			}
		}
	},
	playerTakesDamage: function() {
		//calculate damage player takes
		var damageToPlayer = game.dragonAttack();	//dragon's attack is calculated
		if (player.guarding) {
			//if player is guarding, player takes half of the damage
			//sets multiplier to true for more damage next round
			damageToPlayer /= 2;
			player.guarding = false;
			player.multiplier = true;
		}

		player.health -= damageToPlayer;	//decrease player's health by damage done by dragon
		if (player.health < 0) {
			player.health = 0;
		}
	},
	dragonTakesDamage: function() {
		//calculate damage dragon takes
		var critRoll = Math.random();		//calculate critical strike with player crititcal percent
		damagetoDragon = Math.floor(player.strength/2)
		if (player.usingFodder) {
			//if using fodder, player takes no damage
			//decrements fodder and sets usingFodder to false
			player.fodder--;
			player.usingFodder = false;
		}
		if (critRoll < (100 - player.critical)/100) {
			damagetoDragon += damagetoDragon * 0.5;
		}
		if (player.multiplier) {
			//if multiplier is available, increase damage by 50%
			damagetoDragon += damagetoDragon * 0.5;
			player.multiplier = false;
		}
		game.dragonHealth -= damagetoDragon;	//decrease dragon's health by damage done by player
		if (game.dragonHealth < 0) {
			game.dragonHealth = 0;
		}
	},
	checkEnd: function() {
		//check if game is over
		if (game.dragonHealth <= 0) {
			return "playerWin";
		}
		if (game.day > game.endGameDay) {
			return "aiWin";
		}
		if (player.health <= 0) {
			return "playerLose";
		}
		return false;
	}
}