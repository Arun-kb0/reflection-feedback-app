import { createAsyncThunk } from "@reduxjs/toolkit"
import type { FormConfigType } from "../../constants/formTypes"
import { axiosInstance } from "../../config/axiosInstance"
import errorHandler from "../../util/errorHandler"
import type { RootState } from "../../app/store"


type CreateFormArgsType = Omit<FormConfigType, '_id' | 'createdAt' | 'updatedAt'>
export const createForm = createAsyncThunk('/create-form', async (data: CreateFormArgsType, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.post('/admin/form/create-form', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getLatestFeedbackForm = createAsyncThunk('/get-form', async (_, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.get('/form/latest-form', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})
