import IAppStore from './state'
import { combineReducers } from 'redux'
import burger from './reducers/burgerReducer'
import ui from './reducers/uiReducer'

const rootReducer = combineReducers<IAppStore>({
  burger,
  ui
})

export default rootReducer
