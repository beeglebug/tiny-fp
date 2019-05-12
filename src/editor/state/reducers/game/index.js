import {
  CLEAR_MAP,
  SET_GAME,
  SET_MAP_TILE,
  SET_MAP_ENTITY,
  CLEAR_MAP_ENTITY,
  CLEAR_MAP_ENTITIES,
} from '../../actions'
import arrayOf from '../../../util/arrayOf'
import clearMapEntities from './clearMapEntities'

function setMapTile (game, action) {

  const { x, y, tileId, levelId } = action.payload

  const levelIndex = game.levels.findIndex(level => level.id === levelId)
  const level = game.levels[levelIndex]

  const index = (y * level.width) + x

  const data = [...level.data]
  data[index] = tileId

  const levels = [...game.levels]
  levels[levelIndex] = {
    ...level,
    data,
  }

  return {
    ...game,
    levels,
  }
}

function setMapEntity (game, action) {

  const { x, y, entityId, levelId } = action.payload

  const levelIndex = game.levels.findIndex(level => level.id === levelId)
  const level = game.levels[levelIndex]

  const entities = [...level.entities, { x, y, id: entityId }]

  const levels = [...game.levels]
  levels[levelIndex] = {
    ...level,
    entities,
  }

  return {
    ...game,
    levels,
  }
}

function clearMapEntity (game, action) {

  const { x, y, levelId } = action.payload

  const levelIndex = game.levels.findIndex(level => level.id === levelId)
  const level = game.levels[levelIndex]

  const entities = level.entities.filter(entity => !(entity.x === x && entity.y === y))

  const levels = [...game.levels]
  levels[levelIndex] = {
    ...level,
    entities,
  }

  return {
    ...game,
    levels,
  }
}

function clearMap (game, action) {

  const levelId = action.payload

  const levelIndex = game.levels.findIndex(level => level.id === levelId)
  const level = game.levels[levelIndex]

  const levels = [...game.levels]
  levels[levelIndex] = {
    ...level,
    data: arrayOf(level.width * level.height, 0),
    entities: [],
  }

  return {
    ...game,
    levels,
  }
}

export default function game (state = null, action) {
  switch (action.type) {
    case SET_GAME: return action.payload
    case SET_MAP_TILE: return setMapTile(state, action)
    case SET_MAP_ENTITY: return setMapEntity(state, action)
    case CLEAR_MAP_ENTITY: return clearMapEntity(state, action)
    case CLEAR_MAP_ENTITIES: return clearMapEntities(state, action)
    case CLEAR_MAP: return clearMap(state, action)
    default: return state
  }
}