import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    return commerce.products
      .list({
        category_slug: 'newphones',
      })
      .then((res) => res.data)
  },
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.loading = true
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false
      state.categories = action.payload
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default categorySlice.reducer
