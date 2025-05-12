import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { StatusType } from "../../constants/types"
import type { UserType } from "../../constants/userTypes"
import { getUser, getUsers } from "./userApi"
import type { RootState } from "../../app/store"

type AuthStateType = {
  selectedUser: UserType | undefined
  users: UserType[]
  currentPage: number
  numberOfPages: number
  UsersStatus: StatusType
  error: string | undefined
}


const getInitState = (): AuthStateType => ({
  selectedUser: undefined,
  users: [],
  currentPage: 1,
  numberOfPages: 1,
  UsersStatus: 'idle',
  error: undefined
})

const initialState = getInitState()


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUserToInitState: () => getInitState()

  },

  extraReducers: (builder) => {
    builder

      .addCase(getUsers.pending, (state) => {
        state.UsersStatus = 'loading'
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<{ users: UserType[], currentPage: number, numberOfPages: number }>) => {
        state.UsersStatus = 'success'
        const { users, currentPage, numberOfPages } = action.payload
        const existingIds = new Set(state.users.map(user => user._id))
        const newUsers = users.filter(user => !existingIds.has(user._id))
        state.users = [...state.users, ...newUsers]
        state.currentPage = currentPage
        state.numberOfPages = numberOfPages
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.UsersStatus = 'failed'
        state.error = action.error.message
      })

      
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message
      })


  }
})

export const selectUserSelectedUser = (state: RootState) => state.user.selectedUser
export const selectUserUsers = (state: RootState) => state.user.users
export const selectUserCurrentPage = (state: RootState) => state.user.currentPage
export const selectUserNumberOfPages = (state: RootState) => state.user.numberOfPages
export const selectUserUsersStatus = (state: RootState) => state.user.UsersStatus

export const {
  setUserToInitState
} = userSlice.actions

export default userSlice.reducer
