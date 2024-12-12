const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

// Define the card values
const cards = ["A", "A", "B", "B", "C", "C", "D", "D"];

let flippedCards = []; // To keep track of flipped cards
let matchedCount = 0;  // Count of matched pairs

// Function to shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to create the card elements on the game board
function createCards() {
  // Shuffle the cards
  shuffle(cards);

  // Clear the game board
  gameBoard.innerHTML = "";

  // Create card elements
  cards.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value; // Store the card value in a data attribute
    card.innerText = ""; // Hide the value initially

    // Add a click event listener to handle flipping
    card.addEventListener("click", () => flipCard(card));

    // Add the card to the game board
    gameBoard.appendChild(card);
  });
}

// Function to handle card flipping
function flipCard(card) {
  // Ignore clicks on already flipped or matched cards
  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  // Flip the card
  card.classList.add("flipped");
  card.innerText = card.dataset.value;

  // Add the card to the flippedCards array
  flippedCards.push(card);

  // Check for a match if two cards are flipped
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    // Cards match
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount++;

    // Check if all pairs are matched
    if (matchedCount === cards.length / 2) {
      alert("You win!");
    }
  } else {
    // Cards do not match; flip them back after a short delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
    }, 1000);
  }

  // Clear the flippedCards array
  flippedCards = [];
}

// Function to restart the game
function restartGame() {
  matchedCount = 0;
  flippedCards = [];
  createCards();
}

// Add event listener to the restart button
restartButton.addEventListener("click", restartGame);

// Initialize the game when the page loads
createCards();
