var view = {
}


var main = function() {

	var interactiveSets = [[$('.library'), $('.forge')], [$('.barracks'), $('.gym')], [$('.cave')]];
	var currentSet = 0;

	var hideSet = function(setNum) {
		for (var obj in setNum) {
			setNum[obj].fadeOut('fast');
		}
	}

	var showSet = function(setNum) {
		for (var obj in setNum) {
			setNum[obj].fadeIn('slow');
		}
	}

	hideSet(interactiveSets[1]);
	hideSet(interactiveSets[2]);

	$('.go-right').click(function() {
		if (currentSet === (interactiveSets.length - 1)) { return; }
		hideSet(interactiveSets[currentSet]);
		$('.kingdom').animate({left: "-=600"}, 1000)
		$('.interactive').animate({left: "-=600"}, 1000)
		currentSet++;
		showSet(interactiveSets[currentSet]);
	});

	$('.go-left').click(function() {
		if (currentSet === 0) { return; }
		hideSet(interactiveSets[currentSet]);
		$('.kingdom').animate({left: "+=600"}, 1000)
		$('.interactive').animate({left: "+=600"}, 1000)
		currentSet--;
		showSet(interactiveSets[currentSet]);
	});
	
	currentNarrative = 1;
	$('.narrative').hide();
	$('.narrative1').slideDown();
	$('.next').click(function() {
		$('.narrative:nth-child(' + currentNarrative.toString() + ')').hide();
		currentNarrative++;
		$('.narrative:nth-child(' + currentNarrative.toString() + ')').show();
	});

	$('.start').click(function() {
		$('.narrativeContainer').slideUp();
	});

}

$(document).ready(main);