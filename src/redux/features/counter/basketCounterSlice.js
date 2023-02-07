import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { getPostId } from '../../features/ProdIdSlice'

export const basketCounterSlice = createSlice({
  name: 'basketCounter',
  initialState: {
    value: 1,
  },
  reducers: {
    incrementBasket: (state) => {
      state.value += 1
    },
    decrementBasket: (state) => {
      state.value -= 1
    },
  },
})

export const { incrementBasket, decrementBasket } = basketCounterSlice.actions

export default basketCounterSlice.reducer
