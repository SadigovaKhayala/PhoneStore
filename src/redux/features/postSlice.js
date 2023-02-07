import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commerce } from '../../lib/commerce'

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return commerce.products
    .list({
      limit: 1000,
    })
    .then((res) => res)
})

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loadingPost: false,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loadingPost = true
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loadingPost = false
      state.posts = action.payload
    },
    [getPosts.rejected]: (state, action) => {
      state.loadingPost = false
    },
  },
})

export default postSlice.reducer
