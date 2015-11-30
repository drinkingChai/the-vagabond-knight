var character = {
	health: 20,
	strength: 5,
	critical: 10,
	gold: 0,
	fodder: 0,
	guarding: false,
	usingFodder: false,
	multiplier: false,
	playerHealthPercent: function() {
		return Math.floor(this.health/40 * 100);
	},
	strikeDragon: function() {
		var critRoll = Math.random();
		damageThisRound = Math.floor(this.strength/2)
		if (critRoll < (100 - this.critical)/100) {
			damageThisRound += damageThisRound * 0.5;
		}
		if (this.multiplier) {
			damageThisRound += damageThisRound * 0.5;
			this.multiplier = false;
		}
		game.dragonHealth -= damageThisRound;
	},
	guard: function() {
		this.guarding = true;
	},
	useFodder: function() {
		if (this.fodder === 0) { return false; }
		this.usingFodder = true;
	},
	takeDamage: function() {
		if (this.usingFodder) {
			this.fodder -= 1;
			this.usingFodder = false;
		}

		var damageToPlayer = game.dragonAttack();
		if (this.guarding) {
			damageToPlayer /= 2;
			this.guarding = false;
		}

		this.health -= damageToPlayer;
	},
	playerDead: function() {
		if (this.health > 0) {
			return false;
		}
		return true;
	}
}