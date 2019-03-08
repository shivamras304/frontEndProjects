import React from 'react'
import styles from './index.module.css'

const board = props => {

  let gameGrid = null
  if(props.grid) {
    gameGrid = (
      props.grid.map((gridRow, index) => {
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
                  data-food={gridCell.isFood}
                  data-snake={gridCell.isSnake}></div>
              )
            })}
          </div>
        )
      })
    )
  }

  return (
    <div className={styles.Board}>
      { gameGrid }
    </div>
  )
}

export default board