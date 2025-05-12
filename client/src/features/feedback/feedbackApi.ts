import { createAsyncThunk } from "@reduxjs/toolkit"
import type { FeedbackType } from "../../constants/formTypes"
import { axiosInstance } from "../../config/axiosInstance"
import errorHandler from "../../util/errorHandler"
import type { RootState } from "../../app/store"


type CreateFeedbackArgs = Omit<FeedbackType, '_id' | 'createdAt' | 'updatedAt'>
export const createFeedback = createAsyncThunk('/create-feedback', async (data: CreateFeedbackArgs, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.post('/feedback/', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getFeedbacks = createAsyncThunk('/get-feedback', async (page: number, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken, user } = state.auth
    const res = await axiosInstance.get(`/feedback?page=${page}&userId=${user?._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})