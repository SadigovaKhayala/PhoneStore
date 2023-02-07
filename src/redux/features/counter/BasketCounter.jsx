import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrementBasket, incrementBasket } from './basketCounterSlice'
import { getPostId } from '../../features/ProdIdSlice'
import styles from './Counter.module.css'
import { getAddCart } from '../../features/addProductToCartSlice'
import { getRemoveCart } from '../../features/removeProductToCartSlice'
import { getCart } from '../../features/cartSlice'
import { getUpdateCart } from '../../features/updateCartSlice'
import { commerce } from '../../../lib/commerce'
import { initialState } from './basketCounterSlice'

export function BasketCounter({ quantity, id }) {
  const dispatch = useDispatch()
  const { post, loading } = useSelector((state) => state.post)
  const { cart, loadingCart } = useSelector((state) => state.cart)
  const { removeCart, loadingRemoveAddCart } = useSelector(
    (state) => state.removeCart,
  )
  const basketCounter = useSelector((state) => quantity)
  // useEffect(() => {
  //   dispatch(getCart())
  // }, [getCart])

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            dispatch(getUpdateCart())
            // dispatch(getUpdateCart([id, basketCounter]))
          }}
        >
          +
        </button>
        <span className={styles.value}>{basketCounter}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            // dispatch(getUpdateCart([id, basketCounter]))
            // console.log(post.id)
          }}
        >
          -
        </button>
      </div>
    </div>
  )
}
