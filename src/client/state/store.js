import { combineReducers, createStore as createReduxStore } from 'redux'
import { modals } from './reducers'

const preloadedState = window.__PRELOADED_STATE__

// delete window.__PRELOADED_STATE__

export function createStore () {
  return createReduxStore(
    combineReducers({
      modals,
    }),
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
}
