import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },

    toZero: (state) => {
      state.value = 1
    },
  },
})

export const { increment, decrement, toZero } = counterSlice.actions

export default counterSlice.reducer
