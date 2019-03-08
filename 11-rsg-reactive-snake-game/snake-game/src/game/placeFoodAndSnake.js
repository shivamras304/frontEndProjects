/**
 * Modifies the grid to add food
 *
 * @param {Object} { grid, foodCell, nCols}
 * @returns Grid with food
 */
const placeFoodOnGrid = ({ grid, foodCell, nCols}) => {
  if (grid && foodCell && nCols) {
    grid[
      Math.floor(foodCell / nCols)
    ][
      Math.floor(foodCell % nCols)
    ].isFood = true

    return grid
  }
}

/**
 * Modifies the grid to add snake
 *
 * @param {Object} { grid, snake, nCols }
 * @returns Grid with snake
 */
const placeSnakeOnGrid = ({ grid, snake, nCols }) => {
  if (grid && snake && nCols) {
    for(const cell of snake) {
      grid[
        Math.floor(cell / nCols)
      ][
        Math.floor(cell % nCols)
      ].isSnake = true
    }
  
    return grid
  }
}

export {
  placeFoodOnGrid,
  placeSnakeOnGrid
}