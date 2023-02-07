import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getAcsesories = createAsyncThunk(
  'acsesories/getAcsesoriesgetAcsesories',
  async () => {
    return commerce.products
      .list({
        category_slug: 'newacsessories',
      })
      .then((res) => res.data)
  },
)
const acsesoriesSlice = createSlice({
  name: 'acsesories',
  initialState: {
    acsesories: [],
    loading: false,
  },
  extraReducers: {
    [getAcsesories.pending]: (state, action) => {
      state.loading = true
    },
    [getAcsesories.fulfilled]: (state, action) => {
      state.loading = false
      state.acsesories = action.payload
    },
    [getAcsesories.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default acsesoriesSlice.reducer
