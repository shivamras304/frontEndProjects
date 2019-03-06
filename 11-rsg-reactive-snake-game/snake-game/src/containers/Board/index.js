import React, { Component } from 'react'
import styles from './index.module.css'
import { getGridDimensions, getGrid, getFoodCell, getInitialSnake } from '../../game/gameSetup'


class Board extends Component {

  state = {
    grid: getGrid(),
    mRows: getGridDimensions().mRows,
    nCols: getGridDimensions().nCols,
    foodCell: getFoodCell(),
    snake: getInitialSnake()
  }

  render() {
    console.log('foodcell',this.state.foodCell)
    console.log('cols',this.state.nCols)
    console.log(Math.floor(this.state.foodCell / this.state.nCols));
    console.log(Math.floor(this.state.foodCell % this.state.nCols));
    console.log('gridele',this.state.grid[
      Math.floor(this.state.foodCell / this.state.nCols)
    ][
      Math.floor(this.state.foodCell % this.state.nCols)
    ].value);
    
    let gridArray = this.state.grid
    gridArray[
      Math.floor(this.state.foodCell / this.state.nCols)
    ][
      Math.floor(this.state.foodCell % this.state.nCols)
    ].isFood = true

    console.log(this.state.snake)
    for(const cell of this.state.snake) {
      gridArray[
        Math.floor(cell / this.state.nCols)
      ][
        Math.floor(cell % this.state.nCols)
      ].isFood = true
    }
    
    let grid = gridArray.map((gridRow, index) => {
      return (
        <div 
          key={index}
          className={styles.Row}>
          {gridRow.map(gridCell => {
            return (
              <div 
                key={gridCell.value} 
                className={styles.Cell} 
                data-val={gridCell.value} 
                data-food={gridCell.isFood}></div>
            )
          })}
        </div>
      )
    })
    return (
      <div className={styles.Board}>
        {grid}
      </div>
    )
  }
}

export default Board