
import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
// console.log(board.grid);
const numRows = board.numRows;
const numCols = board.numCols;
const numRemaining = board.numRemaining;

window.addEventListener("DOMContentLoaded", e => {
    const divMain = document.createElement("div");
    divMain.setAttribute("id", "game-board");
    document.body.appendChild(divMain);

    let gameOver = false; // Flag to track game over state

    // Create a reset button element
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.addEventListener("click", resetGame);

    // Append the reset button to the document
    document.body.appendChild(resetButton);

    function resetGame() {
        // Remove the "YOU WIN!" message if it exists
        const winMessage = document.querySelector("h1 p");
        if (winMessage) {
            winMessage.remove();
        }

        // Clear the game board and reset the board object
        divMain.innerHTML = "";
        board = new Board();
        console.log(board.grid);

        // Reset the game state
        gameOver = false;

        // Add new cells and click event listeners
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const gameBoard = document.getElementById("game-board");
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);

                cell.addEventListener("click", handleClick);
            }
        }
    }

    function handleClick(e) {
        if (gameOver) {
            return; // Prevent further clicks if game is over
        }

        const row = e.target.dataset.row;
        const col = e.target.dataset.col;

        const result = board.makeHit(row, col);

        if (result === null) {
            e.target.classList.add("missed");
        } else {
            e.target.classList.add("hit");
            e.target.textContent = result;
            console.log(numRemaining);
        }

        if (board.isGameOver()) {
            gameOver = true; // Set the game over flag
            const newElem = document.createElement("p");
            newElem.textContent = "YOU WIN!";
            const h1 = document.querySelector("h1");
            h1.appendChild(newElem);

            // Remove click event listener from all cells
            const cells = document.querySelectorAll(".cell");
            cells.forEach(cell => {
                cell.removeEventListener("click", handleClick);
            });
        }
    }
});
