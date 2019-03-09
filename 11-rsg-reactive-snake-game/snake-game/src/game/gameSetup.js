import * as constants from '../utils/constants'

let mRows = constants.GRID_ROWS
let nCols = constants.GRID_COLUMNS

/**
 * Returns number of rows and columns in an object
 *
 * @returns {Object}
 */
const getGridDimensions = () => {
  return {
    mRows, nCols
  }
}

/**
 * Returns a 2D-Array of grid cells. Each grid cell has following values:
 * value, up, down, left, right
 *
 * @returns {2D-Array}
 */
const getGrid = () => {
  let grid = []
  for (let i=0; i < mRows; i++) {
    grid.push([])
    for (let j=0; j < nCols; j++) {
      let cellValue = i*nCols + j
      let cell = {
        value: cellValue,
        [constants.UP]: verifyValue(cellValue - nCols, constants.UP),
        [constants.DOWN]: verifyValue(cellValue + nCols, constants.DOWN),
        [constants.LEFT]: verifyValue(cellValue - 1, constants.LEFT),
        [constants.RIGHT]: verifyValue(cellValue + 1, constants.RIGHT),
      }
      grid[i].push(cell)
    }
  }
  printGrid(grid)
  return grid
}

const verifyValue = (value, direction) => {
  switch (direction) {
    case constants.UP: return value < 0 ? constants.GRID_INVALID : value
    case constants.DOWN: return value >= (mRows * nCols) ? constants.GRID_INVALID : value
    case constants.LEFT: return (value + 1) % nCols === 0 ? constants.GRID_INVALID : value
    case constants.RIGHT: return value % nCols === 0 ? constants.GRID_INVALID : value
    default: return constants.GRID_INVALID
  }
}

const printGrid = (grid) => {
  for (let i=0; i < mRows; i++) {
    let row = '|'
    for (let j=0; j < nCols; j++) {
      row += ' ' + (grid[i][j].value < 10 ? '0' + grid[i][j].value : grid[i][j].value) + ' |'
    }
    console.log(row)
    console.log()
  }
}

/**
 * This method randomly select any cell in the grid
 *
 * @returns {Number}
 */
const getFoodCell = () => {
  return Math.floor(Math.random() * mRows * nCols)
}

/**
 * This method tries to place the snake in the center of the grid
 *
 * @returns {Array} Array of indices of the snake body
 */
const getInitialSnake = () => {
  let snakeHead = Math.floor(mRows/3 * nCols) + Math.floor(nCols/2)
  return [
    snakeHead,
    snakeHead + nCols,
    snakeHead + nCols + nCols
  ]
}

export {
  getGridDimensions,
  getGrid,
  getFoodCell,
  getInitialSnake
}