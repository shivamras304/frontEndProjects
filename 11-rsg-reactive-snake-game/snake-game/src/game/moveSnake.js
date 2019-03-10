import { store } from '../index'
import { GRID_COLUMNS, GRID_INVALID } from '../utils/constants'
import { moveSnake as moveSnakeAction, gameOver, eatFood, levelUp } from '../store/actions'
import { getFoodCell } from './gameSetup';

//Try using store.subscribe to access the latest state
const moveSnake = () => {
  // FIXME: There is a bug which causes the game to be abrubtly over
  // It is caused when two changeSnakeDirection(s) are called in succession without a 
  // moveSnake called in between. Make sure that every changeSnakeDirection is followed
  // by a moveSnake or atleast coupled with it
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

  // Adding a new Head
  snake.unshift(
    grid[
      Math.floor(snake[0] / GRID_COLUMNS)
    ][
      Math.floor(snake[0] % GRID_COLUMNS)
    ][direction]
  )

  if (snake[0] === foodCell) {
    // Generating new food cell
    foodCell = getFoodCell()
    store.dispatch(eatFood(foodCell))

    if ((snake.length - 3) % 5 === 0 && snake.length > 5) {
      // Levelling up after every 5 meals
      store.dispatch(levelUp())
    }
  } else {
    // Clipping the tail
    snake.pop()
  }
  
  if (snake[0] === GRID_INVALID || snake.lastIndexOf(snake[0]) !== 0) {
    store.dispatch(gameOver())
  } else {
    store.dispatch(moveSnakeAction(snake))
  }
}

export {
  moveSnake
}