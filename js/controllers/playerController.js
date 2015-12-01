//player controller

var playerController = {
	playerHealthPercent: function() {
		//returns the player's hp in percent
		//for use with bootstrap progress bar
		return Math.floor(player.health/20 * 100);
	},
	guard: function() {
		//sets the guarding status of player
		player.guarding = true;
	},
	useFodder: function() {
		//checks to see if fodder is available
		//if available, set usingFodder status to true
		//returns true for view to notify player if fodder is available
		if (player.fodder === 0) { return false; }
		player.usingFodder = true;
		return true;
	},
	addFodder: function(enahanceOpt) {
		//adds fodder if player has sufficient gold
		//takes into input enhanceOpt from player
		//where fodder cost is 
		if (player.gold < enahanceOpt.gold) {
			return false;
		}
		player.gold -= enahanceOpt.gold;
		player.fodder += enahanceOpt.fodder;
		return true;
	}
}