import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { RootState } from "../../app/store"
import { createForm, getLatestFeedbackForm } from "./formApi"
import type { FeedbackType, FormConfigType } from "../../constants/formTypes"

type FormStateType = {
  createFormStatus: StatusType
  currentForm: FormConfigType | undefined
  forms: any[]
  error: string | undefined
}

const getInitState = (): FormStateType => ({
  createFormStatus: 'idle',
  currentForm: undefined,
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


      .addCase(getLatestFeedbackForm.fulfilled, (state, action) => {
        state.currentForm = action.payload
      })
      .addCase(getLatestFeedbackForm.rejected, (state, action) => {
        state.error = action.error.message
      })

    
  }

})

export const selectFormCreateFormStatus = (state: RootState) => state.form.createFormStatus;
export const selectFormForms = (state: RootState) => state.form.forms;
export const selectFormCurrentForm = (state: RootState) => state.form.currentForm;

export const {
  setFormSliceToInitState
} = formSlice.actions

export default formSlice.reducer
