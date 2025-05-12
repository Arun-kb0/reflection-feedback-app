import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { RootState } from "../../app/store"
import type { FeedbackType } from "../../constants/formTypes"
import { createFeedback } from "./feedbackApi"

type FormStateType = {
  feedbacks: FeedbackType[]
  currentPage: number
  numberOfPages: number
  feedbacksStatus: StatusType
  createFeedbackStatus: StatusType
  error: string | undefined
}

const getInitState = (): FormStateType => ({
  feedbacks: [],
  currentPage: 1,
  numberOfPages: 1,
  feedbacksStatus: 'idle',
  createFeedbackStatus: 'idle',
  error: undefined
})

const initialState = getInitState()


const feedback = createSlice({
  name: "feedback",
  initialState,
  reducers: {

    setFeedbackToInitState: () => getInitState()

  },

  extraReducers: (builder) => {
    builder

      .addCase(createFeedback.pending, (state) => {
        state.createFeedbackStatus = 'loading'
      })
      .addCase(createFeedback.fulfilled, (state, action: PayloadAction<FeedbackType>) => {
        state.createFeedbackStatus = 'success'
        state.feedbacks.push(action.payload)
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.createFeedbackStatus = 'failed'
        state.error = action.error.message
      })


  }

})

// Selectors
export const selectFeedbacks = (state: RootState) => state.feedback.feedbacks
export const selectFeedbacksStatus = (state: RootState) => state.feedback.feedbacksStatus
export const selectCreateFeedbackStatus = (state: RootState) => state.feedback.createFeedbackStatus
export const selectFeedbackError = (state: RootState) => state.feedback.error

export const {
  setFeedbackToInitState
} = feedback.actions

export default feedback.reducer
