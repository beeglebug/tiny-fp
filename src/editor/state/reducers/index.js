import { combineReducers } from 'redux'
import { TOOLS } from '../../consts'
import { SELECT_TILE, SELECT_TOOL, SET_SHOW_GRID } from '../actions'
import game from './game'

const selectedTile = (state = 1, action) => {
  if (action.type === SELECT_TILE) return action.payload
  return state
}

const selectedTool = (state = TOOLS.PAINT, action) => {
  if (action.type === SELECT_TOOL) return action.payload
  return state
}

function showGrid (state = true, action) {
  if (action.type === SET_SHOW_GRID) return action.payload
  return state
}

export default combineReducers({
  game,
  selectedTile,
  selectedTool,
  showGrid,
})
