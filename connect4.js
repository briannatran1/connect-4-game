"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x]); our state of the game

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//iterate through WIDTH using for...loop
  //declare newRow variable that is set to [row]
  //push newRow to board
//return board

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  // Array.from() to set correct number of rows
  for(let y = 0; y < HEIGHT; y++){
    const newRow = Array.from({length: WIDTH}, val => null);
    board.push(newRow);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHTMLBoard() {
  const htmlBoard = document.getElementById('board');


  // declaring/initializing each rows and setting its id to 'column-top'
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // create loop to declare each cell of the row
  // setting its id to its current position in the row
  // set click event listener to cell and add to row
  // after loop is finished add row to board (html board)
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", `${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    // make new row using tr element
    const row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      //make new table cell -> td element
      const cell = document.createElement(`td`);
      // add an id, c-y-x, to the above table cell element
      // string interpolation
      cell.setAttribute("id", `c-${y}-${x}`);
      // you'll use this later, so make sure you use c-y-x

      // append the table cell to the table row
      row.append(cell);
    }
    // append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  //  write the real version of this, rather than always returning 5
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // make a div and insert into correct table cell
  // change p1 to be dynamic
  const gamePiece = document.createElement('div');
  gamePiece.setAttribute('class', `piece p${currPlayer}`);

  const spot = document.getElementById(`c-${y}-${x}`);
  spot.append(gamePiece);
}

/** endGame: announce game end */

function endGame(message) {
  // pop up alert message
  alert(message);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // plus sign good? -> NaN
  const x = evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if(board[0].every(cell => cell !== null)){
    return endGame('Tie!');
  }

  // switch players
  // change currPlayer variable from 1 to 2, and vice-versa, on every click
  if (currPlayer === 1) {
    currPlayer = 2;
  }
  else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // Check four cells to see if they're all legal & all color of current
    // player
    return cells.every(([y, x]) =>
      y >= 0 &&
      y < HEIGHT &&
      x >= 0 &&
      x < WIDTH &&
      board[y][x] === currPlayer
    );
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDL = [[y,x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDR = [[y,x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHTMLBoard();
