// These constants define the size of the Game grid
export const GRID_ROWS = 12
export const GRID_COLUMNS = 21
export const GRID_INVALID = -1

// Various directions the snake can move in
export const UP = 'UP'
export const DOWN = 'DOWN'
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'

// Various Game States. The game flow will be decided according to these states
export const GAME_NULL = 'GAME_NULL'
export const GAME_READY = 'GAME_READY'
export const GAME_PLAYING = 'GAME_PLAYING'
export const GAME_PAUSE = 'GAME_PAUSE'
export const GAME_FINISHED = 'GAME_FINISHED'