import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getRemoveCart = createAsyncThunk(
  'removeCart/getRemoveCart',
  async (productId) => {
    const item = await commerce.cart.remove(productId).then((res) => res)
  },
)

const removeCartSlice = createSlice({
  name: 'removeCart',
  initialState: {
    removeCart: [],
    loading: false,
  },
  extraReducers: {
    [getRemoveCart.pending]: (state, action) => {
      state.loading = true
    },
    [getRemoveCart.fulfilled]: (state, action) => {
      state.loading = false
      state.removeCart = action.payload
    },
    [getRemoveCart.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default removeCartSlice.reducer
