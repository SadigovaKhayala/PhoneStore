import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'
export const getUpdateCart = createAsyncThunk(
  'updateCart/getCart',

  async (arr) => {
    const item = await commerce.cart
      .update(arr[0], { quantity: arr[1] })
      .then((res) => res)
  },
)

const updateCartSlice = createSlice({
  name: 'updateCart',
  initialState: {
    updateCart: [],
    loadingUpdateCart: false,
  },
  extraReducers: {
    [getUpdateCart.pending]: (state, action) => {
      state.loadingUpdateCart = true
    },
    [getUpdateCart.fulfilled]: (state, action) => {
      state.loadingUpdateCart = false
      state.updateCart = action.payload
    },
    [getUpdateCart.rejected]: (state, action) => {
      state.loadingUpdateCart = false
    },
  },
})

export default updateCartSlice.reducer
