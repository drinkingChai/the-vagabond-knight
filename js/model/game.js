//game and dragon's model

var game = {
	day: 1,				//number of day
	dragonHealth: 40,	//dragon's health
	endGameDay: Math.floor(Math.random() * 3) + 8,	//randomize between 1-10 for the number of days until the end of game
	dragonHealthPercent: function() {
		//returns the dragon's hp in percent
		//for use with bootstrap progress bar
		return Math.floor(this.dragonHealth/40 * 100);
	},
	dragonAttack: function() {
		//dragon attacks between 3-6
		return Math.floor(Math.random() * 3) + 3;
	}
}