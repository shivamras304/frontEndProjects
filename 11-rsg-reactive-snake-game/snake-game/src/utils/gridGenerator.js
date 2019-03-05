let mRows;
let nCols;
const INVALID = -1

/**
 * This function receives the dimensions of the grid and returns the dynamically generated grid
 *
 * @export
 * @param {Number} m Number of Rows
 * @param {Number} n Number of Columns
 */
const gridGenerator = (m, n) => {
  mRows = m
  nCols = n
  return getGrid()
}

const getGrid = () => {
  let grid = []
  for (let i=0; i < mRows; i++) {
    grid.push([])
    for (let j=0; j < nCols; j++) {
      let cellValue = i*nCols + j
      let cell = {
        value: cellValue,
        up: verifyValue(cellValue - nCols, 'up'),
        down: verifyValue(cellValue + nCols, 'down'),
        left: verifyValue(cellValue - 1, 'left'),
        right: verifyValue(cellValue + 1, 'right'),
      }
      grid[i].push(cell)
    }
  }
  printGrid(grid)
  return grid
}

const verifyValue = (value, direction) => {
  switch (direction) {
    case 'up': return value < 0 ? INVALID : value
    case 'down': return value >= (mRows * nCols) ? INVALID : value
    case 'left': return (value + 1) % nCols === 0 ? INVALID : value
    case 'right': return value % nCols === 0 ? INVALID : value
    default: return -1
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

export default gridGenerator