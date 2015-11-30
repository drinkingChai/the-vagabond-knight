var game = {
	day: 1,
	endGameDay: Math.floor(Math.random() * 3) + 8,
	dragonHealth: 40,
	dragonHealthPercent: function() {
		return Math.floor(this.dragonHealth/40 * 100);
	},
	dragonAttack: function() {
		return Math.floor(Math.random() * 3) + 3;
	},
	enhanceOpt: {
		readDragBook: {
			critical: 10,
			day: 0.5
		},
		readKnightBook: {
			strength: 2,
			day: 0.5
		},
		readAnime: {
			day: 0.5
		},
		repairArmor: {
			gold: 2.5,
			day: 0.25
		},
		eavesdrop: {
			critical: 18,
			day: 1
		},
		workout: {
			strength: 3,
			day: 1
		},
		fodder: {
			fodder: 1,
			gold: 5
		}
	},
	checkEnd: function() {
		console.log(this.endGameDay);
		if (this.dragonHealth <= 0) {
			return "playerWin";
		}
		if (this.day > this.endGameDay) {
			return "aiWin";
		} 
		return false;
	},
	addDay: function(amount) {
		this.day += amount;
	}
}