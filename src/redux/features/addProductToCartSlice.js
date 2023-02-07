import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { commerce } from '../../lib/commerce'
import { Counter } from '../features/counter/counterSlice'

export const getAddCart = createAsyncThunk(
  'addCart/getAddCart',
  async (arr) => {
    const item = await commerce.cart.add(arr[0], arr[1]).then((res) => res)
  },
)

const addCartSlice = createSlice({
  name: 'addCart',
  initialState: {
    addCart: [],
    loading: false,
  },
  extraReducers: {
    [getAddCart.pending]: (state, action) => {
      state.loading = true
    },
    [getAddCart.fulfilled]: (state, action) => {
      state.loading = false
      state.addCart = action.payload
    },
    [getAddCart.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default addCartSlice.reducer
