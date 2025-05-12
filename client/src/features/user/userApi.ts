import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../config/axiosInstance"
import errorHandler from "../../util/errorHandler"
import type { RootState } from "../../app/store"


export const getUsers = createAsyncThunk('/create-form', async (page: number, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.get(`/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})

export const getUser = createAsyncThunk('/get-user', async (userId: string, { getState }) => {
  try {
    const state = getState() as RootState
    const { accessToken } = state.auth
    const res = await axiosInstance.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})
