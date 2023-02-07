import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getPostId = createAsyncThunk('post/getPostId', async (prodId) => {
  return commerce.products.retrieve(prodId).then((res) => res)
})

const postIdSlice = createSlice({
  name: 'post',
  initialState: {
    post: [],
    loadingPost: false,
  },
  extraReducers: {
    [getPostId.pending]: (state, action) => {
      state.loadingPost = true
    },
    [getPostId.fulfilled]: (state, action) => {
      state.loadingPost = false
      state.post = action.payload
    },
    [getPostId.rejected]: (state, action) => {
      state.loadingPost = false
    },
  },
})

export default postIdSlice.reducer
