import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/postSlice'
import postIdReducer from '../features/ProdIdSlice'
import categoryReducer from '../features/categoriesSlice'
import bestsellerReducer from '../features/bestsellerSlice'
import cartReducer from '../features/cartSlice'
import addCartReducer from '../features/addProductToCartSlice'
import removeCartReducer from '../features/removeProductToCartSlice'
import deleteCartReducer from '../features/deleteCartSlice'
import acsesoriesReducer from '../features/acsesoriesSlice'
import counterReducer from '../features/counter/counterSlice'
import basketCounterReducer from '../features/counter/basketCounterSlice'
import updateCartReducer from '../features/updateCartSlice'
export default configureStore({
  reducer: {
    posts: postReducer,
    post: postIdReducer,
    categories: categoryReducer,
    bestseller: bestsellerReducer,
    acsesories: acsesoriesReducer,
    cart: cartReducer,
    addCart: addCartReducer,
    removeCart: removeCartReducer,
    deleteCart: deleteCartReducer,
    counter: counterReducer,
    basketCounter: basketCounterReducer,
    updateCart: updateCartReducer,
  },
})
