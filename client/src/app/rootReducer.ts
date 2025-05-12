import { combineReducers, type AnyAction } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import formReducer from '../features/form/formSlice'
import userReducer from '../features/user/userSlice'
import feedbackReducer from '../features/feedback/feedbackSlice'

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  feedback: feedbackReducer
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'resetStore') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer