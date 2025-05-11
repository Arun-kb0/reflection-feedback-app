import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { UserType } from "../../constants/userTypes"
import type { RootState } from "../../app/store"
import { createForm } from "./formApi"

type AuthStateType = {
  createFormStatus: StatusType
  forms: any[]
  error: string | undefined
}

const getInitState = (): AuthStateType => ({
  createFormStatus: 'idle',
  forms: [],
  error: undefined
})

const initialState = getInitState()


const formSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setFormSliceToInitState: () => getInitState()

  },

  extraReducers: (builder) => {
    builder

      .addCase(createForm.pending, (state) => {
        state.createFormStatus = 'loading'
      })
      .addCase(createForm.fulfilled, (state) => {
        state.createFormStatus = 'success'
      })
      .addCase(createForm.rejected, (state, action) => {
        state.createFormStatus = 'failed'
        state.error = action.error.message
      })

  }

})

export const selectFormCreateFormStatus = (state: RootState) => state.form.createFormStatus;
export const selectFormForms = (state: RootState) => state.form.forms;

export const {
  setFormSliceToInitState
} = formSlice.actions

export default formSlice.reducer
