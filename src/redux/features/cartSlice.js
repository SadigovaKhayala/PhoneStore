import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getCart = createAsyncThunk('cart/getCart', async () => {
  return commerce.cart.retrieve().then((res) => res)
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loadingCart: false,
  },
  extraReducers: {
    [getCart.pending]: (state, action) => {
      state.loadingCart = true
    },
    [getCart.fulfilled]: (state, action) => {
      state.loadingCart = false
      state.cart = action.payload
    },
    [getCart.rejected]: (state, action) => {
      state.loadingCart = false
    },
  },
})

export default cartSlice.reducer
