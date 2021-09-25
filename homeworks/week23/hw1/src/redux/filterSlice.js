import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'all',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    all: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = 'all'
    },
    done: (state) => {
      state.value = 'done'
    },
    pending: (state) => {
      state.value = 'pending'
    },
  },
})

// Action creators are generated for each case reducer function
export const { all, done, pending } = filterSlice.actions

export default filterSlice.reducer