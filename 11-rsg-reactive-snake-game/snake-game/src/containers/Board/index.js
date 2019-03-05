import React, { Component } from 'react'
import styles from './index.module.css'
import gridGenerator from '../../utils/gridGenerator'


class Board extends Component {

  state = {
    grid: gridGenerator(12,20)
  }

  render() {
    let grid = this.state.grid.map((gridRow, index) => {
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