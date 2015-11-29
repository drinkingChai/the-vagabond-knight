var view = {
}


var main = function() {

	var $set1 = [$('.kingdom1'), $('.library'), $('.forge')];
	var $set2 = [$('.kingdom2'), $('.barracks'), $('.gym')];
	var $set3 = [$('.kingdom3'), $('.cave')];
	var setOrder = [$set1, $set2, $set3];
	var currentSet = 0;

	var hideSet = function(setNum) {
		for (var obj in setNum) {
			setNum[obj].hide();
		}
	}

	var showSet = function(setNum) {
		for (var obj in setNum) {
			setNum[obj].show();
		}
	}

	hideSet($set2);
	hideSet($set3);
	$('.narrative').hide();

	$('.go-right').click(function() {
		if (currentSet === (setOrder.length - 1)) { return; }
		hideSet(setOrder[currentSet]);
		currentSet++;
		showSet(setOrder[currentSet]);
	});

	$('.go-left').click(function() {
		if (currentSet === 0) { return; }
		hideSet(setOrder[currentSet]);
		currentSet--;
		showSet(setOrder[currentSet]);
	});

}

$(document).ready(main);