
matchingGame();

function matchingGame() {

	// Main selector for game object
	this.gamediv = document.getElementById("MatchingGame");

	// card size and spacing
	// game size variables
	this.cardSize = 100;
	this.cardSpacing = 10;
	this.gameWidth = 4;
	this.gameHeight = 4;

	//card matching variables
	this.firstCard = null;
	this.secondCard = null;
	this.checkTimeout = null;
	this.matches = 0;

	// function to create the grid of cards
	this.createGrid = function (height, width) {
		// array of card images
		let array = [];
		for (let i = 0; i < gameWidth * gameHeight / 2; i++) {
			array.push(i);
			array.push(i);
		}

		// shuffle the deck of cards
		let shuffledArray = [];
		while (array.length > 0) {
			let r = Math.floor(Math.random() * array.length);
			shuffledArray.push(array[r]);
			array.splice(r, 1);
		}

		// for loop to add card values to grid
		for (let x = 0; x < height; x++) {
			for (let y = 0; y < width; y++) {
				createCard(shuffledArray.pop(),x,y);
			}
		}
	}

	// card creation function and game functionality
	this.createCard = function(cardNum, posX, posY) {
		// local card variable
		let card = document.createElement("img");
		card.num = cardNum;
		card.src = "matchCards/cardback.png";
		card.style.cssText = "-webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -o-user-select: none; user-select: none; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drad: none;";
		card.style.position = "absolute";
		card.style.left = (posX * (cardSize + cardSpacing) + cardSpacing) + "px";
		card.style.top = (posY * (cardSize + cardSpacing) + cardSpacing) + "px";
		// event listener for card click
		card.addEventListener('click', (e) => {
			playSound("click.mp3");
			// if player clicks before timeout trigger new timeout
			if (checkTimeout != null) {
				clearTimeout(checkTimeout);
				checkCards();
			}

			let card = e.target;
			card.src = "matchCards/card" + card.num + ".png";

			// gives cards clicked on value
			if (firstCard === null) {
				firstCard = card;
				//flips card back over if clicked on twice
			} else if (firstCard === card) {
				firstCard.src = "matchCards/cardback.png";
				firstCard = null;
			} else if (secondCard === null) {
				secondCard = card;
				// stores a reference to this timeout
				checkTimeout = setTimeout(checkCards, 1000);
			}	
	});
		gamediv.appendChild(card);
	}

	// checks to see if card values match
	this.checkCards = function() {
			if (firstCard.num == secondCard.num) {
				gamediv.removeChild(firstCard);
				gamediv.removeChild(secondCard);
				playSound("match.mp3");
				matches++;
				if (matches >= gameWidth * gameHeight / 2) {
					gameWon();
				}
			} else {
				firstCard.src = "matchCards/cardback.png";
				secondCard.src = "matchCards/cardback.png";
			}

			// resets card values to null
			firstCard = null;
			secondCard = null;
			checkTimeout = null;
	}

	this.gameWon = function() {
		document.getElementById("GameWin").style.visibility = "visible";
	}

	this.playSound = function(fileName) {
		let audio = new Audio(fileName);
		audio.play();
	}
	this.createGrid(gameWidth, gameHeight);

}














