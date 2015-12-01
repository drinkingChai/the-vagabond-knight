//character models

var player = {
	//player model
	health: 20,
	strength: 5,
	critical: 10,
	gold: 0,
	fodder: 0,
	guarding: false,
	usingFodder: false,
	multiplier: false,	//multiplier for guard
	enhanceOpt: {
		//for gameController.updatePlayerAndDay function
		//takes any number of updates to the player
		//as well as the number of days to increment of the game
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
	}
}