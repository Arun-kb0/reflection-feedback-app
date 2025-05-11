import { combineReducers, type AnyAction } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

const appReducer = combineReducers({
  auth: authReducer
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'resetStore') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer