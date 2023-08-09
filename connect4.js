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
  for(let row = 0; row < WIDTH; row++){
    let newRow = Array.from({length: 7});
    board.push(newRow);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHTMLBoard() {
  let gameBoard = document.getElementById('board');


  // declaring/initializing each rows and setting its id to 'column-top'
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // create loop to declare each cell of the row
  // setting its id to its current position in the row
  // set click event listener to cell and add to row
  // after loop is finished add row to board (html board)
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }
  gameBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // Create a table row element and assign to a "row" variable
    // make new row using tr element
    let row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      //make new table cell -> td element
      let cell = document.createElement(`td`);
      // add an id, c-y-x, to the above table cell element
      // string interpolation
      cell.setAttribute("id", `c-${y}-${x}`);
      // you'll use this later, so make sure you use c-y-x

      // append the table cell to the table row
      row.append(cell);
    }
    // append the row to the html board
    gameBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //FIXME: change p1 to be dynamic
  let gamePiece = document.createElement('div');
  gamePiece.setAttribute('class', `piece p${currPlayer}`);

  let cell = document.getElementById(`c-${y}-${x}`);
  console.log('x is equal to ', x);
  console.log('y is equal to ', y);
  cell.append(gamePiece);
}

/** endGame: announce game end */

function endGame(message) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  // FIXME: plus sign good? -> NaN
  let x = evt.target.id;
  console.log('evt target = ', x);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  // TODO: change title '_win?'
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHTMLBoard();
