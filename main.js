

// Set global variables 
var userChoice = ""; // User's choice
var computerChoice = ""; // Comp's choice
var wlt = ""; // Status of win/lose/tie
var wins = localStorage.getItem('saved-wins'); // Set location of wins
var losses = localStorage.getItem('saved-losses'); // Set location of losses
var ties = localStorage.getItem('saved-ties'); // Set location of ties

// Result Function - How to decide who won or if it's a tie
var result = function() {
	if (userChoice === computerChoice) {
		wlt = "tie"; // It's tie because choices are the same		
	} else if (userChoice === "rock") {
		if (computerChoice === "paper") {
		wlt = "lose"; // Paper beats rock		
		} else if (computerChoice === "scissors") {
		wlt = "win"; // Rock beats scissors		
		}
	} else if (userChoice === "paper") {
		if (computerChoice === "scissors") {
		wlt = "lose"; // Scissors beats paper	
		} else if (computerChoice === "rock") {
		wlt = "win"; // Paper beats rock
		}	
	} else if (userChoice === "scissors") {
		if (computerChoice === "rock") {
		wlt = "lose"; // Rock beats scissors
		} else if (computerChoice === "paper") {
		wlt = "win"; // Scissors beats paper	
		}
	}
};	

// THURSDAY TO-DO: Re-organize divs to make final page look clean. Go through code and clean up. Then rehaul design.

var magic = function() {
	$('.last-bit').addClass('hidden');
	$('.hand').removeClass('hidden').delay(2900).queue(function(next){ //2900
		$('.hand').addClass('animated slideOutRight');
		next();
	}).delay(1000).queue(function(next1){ //1000
		$('.hand').addClass('hidden');
					$('.finale').removeClass('hidden');
			$('.finale').load('finale.html', finale).slideDown();


		;
		next1();
	});


};

var finale = function() {
		// Parse values to numbers
	var numWins = parseInt(wins,10);
	var numLosses = parseInt(losses,10); 
	var numTies = parseInt(ties,10);
	// Finish layout change based on Result Function (Part 2) -- will reappear after animation run
	$('.topleft p').after("<h2 class='user-choice'>You went with " + userChoice + "...</p>"); // Remind user of choice
	if (userChoice === "paper") {
		$('.user-pic p').after("<img class='rps-pic' src='paper.png'/>")
	} else if (userChoice === "rock") {
		$('.user-pic p').after("<img class='rps-pic' src='rock.png'/>")
	} else {
		$('.user-pic p').after("<img class='rps-pic' src='scissors.png'/>")
	};
	$('.topright p').after("<h2 class='comp-choice'>The computer chose " + computerChoice + "...</p>"); // Tell user what comp chose
	if (computerChoice === "paper") {
		$('.comp-pic p').after("<img class='rps-pic2' src='paper.png'/>")
	} else if (computerChoice === "rock") {
		$('.comp-pic p').after("<img class='rps-pic2' src='rock.png'/>")
	} else {
		$('.comp-pic p').after("<img class='rps-pic2' src='scissors.png'/>")		
		};

				if (wlt === "win") {
		$('.midmid p').after("<p class='wlt'>You win</p>");
		numWins = numWins + 1; // Add 1 to win counter 
		localStorage.setItem('saved-wins', numWins); // Store wins to local storage
		} else if (wlt === "lose") {
			$('.midmid p').after("<p class='wlt'>You lose</p>");
			numLosses = numLosses + 1; // Add 1 to loss counter
			localStorage.setItem('saved-losses', numLosses); // Store losses to local storage
		} else if (wlt === "tie") {
			$('.midmid p').after("<p class='wlt'>It's a tie</p>");	
			numTies = numTies + 1; // Add 1 to tie counter
			localStorage.setItem('saved-ties', numTies); // Store tie to local storage
		}

		// Finally add a nice "Play again" option
		$('.midbottom p').after('<ul><li><a href="#" class="play-again">Play again?</a></li></ul>');
		$('.topleft p, .topright p, .user-pic p, .comp-pic p, midmid p, midbottom p').hide();
}

// Main Game Function - Decide comp's choice, compare to user, print results
var game = function() {

	// Deciding computer's choice
	computerChoice = Math.random();

	if (computerChoice < 0.34) {
		computerChoice = "rock";
	} else if(computerChoice <= 0.67) {
		computerChoice = "paper";
	} else {
		computerChoice = "scissors";
	};
	console.log("Computer: " + computerChoice); // Logged for those who wish to cheat

	// Click function on list to decide user's choice
	$('.game-list li').click(function() {
		userChoice = $(this).attr('class'); // User choice is based off list
		console.log("Player: " + userChoice); // Logged for testing

		// Changes layout of screen for post decision results (Part 1)
		$('.intro').hide(); // Hide intro
		$('.game').hide(); // Hide choices so you can't go again
		$('.counter').hide(); // Hide counter as it does not reload immediately
		$('.last').hide(); // Hide counter reset

		// Determine winner and run RPS animation
		result(); // From before will tell us result - w/l/t
		magic(); // Run RPS animation






	})
};

var main = function() {
	// Set counter to zero if no storage
	if (wins === null) {
		wins = 0;
	};

	if (ties === null) {
		ties = 0;
	};

	if (losses === null) {
		losses = 0;
	};

	// Parse values to numbers
	var numWins = parseInt(wins,10);
	var numLosses = parseInt(losses,10);
	var numTies = parseInt(ties,10);

	// Print counter numbers 
	$('.wins-count').text(numWins);
	$('.losses-count').text(numLosses);
	$('.ties-count').text(numTies);

	// Run game function
	game();


	// Allow next round to load
	$(document).on('click', '.play-again', function() {
		location.reload();
	});

	// Allow a counter reset
	$('.last').click(function() {
		if (confirm('Are you sure?')) {	
			localStorage.clear();
			location.reload();
		} 
	});
};

// Load everything when the sauce is ready
$(document).ready(main);