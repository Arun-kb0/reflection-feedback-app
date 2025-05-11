import { createAsyncThunk } from "@reduxjs/toolkit"
import type { FormConfigType } from "../../constants/formTypes"
import { axiosInstance } from "../../config/axiosInstance"
import errorHandler from "../../util/errorHandler"


type CreateFormArgsType = Omit<FormConfigType, '_id' | 'createdAt' | 'updatedAt'>
export const createForm = createAsyncThunk('/create-form', async (data: CreateFormArgsType) => {
  try {
    const res = await axiosInstance.post('/admin/form/create-form', data)
    return res.data
  } catch (error) {
    return errorHandler(error)
  }
})
