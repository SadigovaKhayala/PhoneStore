import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getBestseller = createAsyncThunk(
  'bestseller/getBestseller',
  async () => {
    return commerce.products
      .list({
        category_slug: ['bestseller'],
      })
      .then((res) => res.data)
  },
)

const bestsellerSlice = createSlice({
  name: 'bestseller',
  initialState: {
    bestseller: [],
    loading: false,
  },
  extraReducers: {
    [getBestseller.pending]: (state, action) => {
      state.loading = true
    },
    [getBestseller.fulfilled]: (state, action) => {
      state.loading = false
      state.bestseller = action.payload
    },
    [getBestseller.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default bestsellerSlice.reducer
