import { store } from '../index'
import { GRID_COLUMNS, GRID_INVALID } from '../utils/constants'
import { moveSnake as moveSnakeAction, gameOver } from '../store/actions'
import { getFoodCell } from './gameSetup';

//Try using store.subscribe to access the latest state
const moveSnake = () => {
  const currentGameState = store.getState()

  // This is a very important step. Never mutate the state directly and be aware of 
  // assignment operator with state values
  let snake = [
    // Copying state immutably
    ...currentGameState.game.snake
  ]
  const direction = currentGameState.game.direction
  const grid = currentGameState.game.grid
  let foodCell = currentGameState.game.foodCell
  
  // TODO: FIXME:Check invalid direction and pass return
  if(snake[0] === -1) {
    return
  }

  // Adding a new Head
  snake.unshift(
    grid[
      Math.floor(snake[0] / GRID_COLUMNS)
    ][
      Math.floor(snake[0] % GRID_COLUMNS)
    ][direction]
  )

  if (snake[0] === foodCell) {
    foodCell = getFoodCell()
    store.dispatch(moveSnakeAction({snake, foodCell}))
  } else {
    // Clipping the tail
    snake.pop()
  }
  
  if (snake[0] === GRID_INVALID) {
    store.dispatch(gameOver())
  } else {
    store.dispatch(moveSnakeAction({snake}))
  }
}

export {
  moveSnake
}