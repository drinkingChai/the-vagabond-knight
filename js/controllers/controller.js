var controller = {
	addFodder: function(enahanceOpt) {
		if (character.gold < enahanceOpt.gold) {
			return false;
		}
		character.gold -= enahanceOpt.gold;
		character.fodder += enahanceOpt.fodder;
		return true;
	},
	enhanceCharacter: function(enahanceOpt) {
		for (var opt in enahanceOpt) {
			if (opt in game) {
				game[opt] += enahanceOpt[opt];
			}
			else if (opt in character) {
				character[opt] += enahanceOpt[opt];
			}
		}
	}
}