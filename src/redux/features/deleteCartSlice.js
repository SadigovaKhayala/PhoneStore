import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getDeleteCart = createAsyncThunk(
  'deleteCart/getDeleteCart',
  async () => {
    const item = await commerce.cart.empty().then((res) => res)
  },
)

const deleteCartSlice = createSlice({
  name: 'deleteCart',
  initialState: {
    deleteCart: [],
    loading: false,
  },
  extraReducers: {
    [getDeleteCart.pending]: (state, action) => {
      state.loading = true
    },
    [getDeleteCart.fulfilled]: (state, action) => {
      state.loading = false
      state.deleteCart = action.payload
    },
    [getDeleteCart.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default deleteCartSlice.reducer
