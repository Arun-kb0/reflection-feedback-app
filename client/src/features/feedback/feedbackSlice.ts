import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { RootState } from "../../app/store"
import type { FeedbackType } from "../../constants/formTypes"
import { createFeedback, getFeedbacks } from "./feedbackApi"

type FormStateType = {
  feedbacks: FeedbackType[]
  currentPage: number
  numberOfPages: number
  getFeedbacksStatus: StatusType
  createFeedbackStatus: StatusType
  error: string | undefined
}

const getInitState = (): FormStateType => ({
  feedbacks: [],
  currentPage: 1,
  numberOfPages: 1,
  getFeedbacksStatus: 'idle',
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


      .addCase(getFeedbacks.pending, (state) => {
        state.getFeedbacksStatus = 'loading'
      })
      .addCase(getFeedbacks.fulfilled, (state, action: PayloadAction<{ feedbacks: FeedbackType, currentPage: number, numberOfPages: number }>) => {
        state.getFeedbacksStatus = 'success'
        const { feedbacks, currentPage, numberOfPages } = action.payload
        const newFeedbacks = Array.isArray(feedbacks) ? feedbacks : [feedbacks]
        const existingIds = new Set(state.feedbacks.map(fb => fb._id))
        const uniqueFeedbacks = newFeedbacks.filter(fb => !existingIds.has(fb._id))
        state.feedbacks.push(...uniqueFeedbacks)
        state.currentPage = currentPage
        state.numberOfPages = numberOfPages
      })
      .addCase(getFeedbacks.rejected, (state, action) => {
        state.getFeedbacksStatus = 'failed'
        state.error = action.error.message
      })


  }

})

// Selectors
export const selectFeedbacks = (state: RootState) => state.feedback.feedbacks
export const selectGetFeedbacksStatus = (state: RootState) => state.feedback.getFeedbacksStatus
export const selectCreateFeedbackStatus = (state: RootState) => state.feedback.createFeedbackStatus
export const selectFeedbackError = (state: RootState) => state.feedback.error

export const {
  setFeedbackToInitState
} = feedback.actions

export default feedback.reducer
