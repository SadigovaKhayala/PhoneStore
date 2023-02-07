import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, toZero } from './counterSlice'
import { getPostId } from '../../features/ProdIdSlice'
import styles from './Counter.module.css'
import { getAddCart } from '../../features/addProductToCartSlice'
import { getRemoveCart } from '../../features/removeProductToCartSlice'
import { getCart } from '../../features/cartSlice'
import { getUpdateCart } from '../../features/updateCartSlice'
import { commerce } from '../../../lib/commerce'

export function Counter() {
  const counter = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const { post, loading } = useSelector((state) => state.post)
  const { cart, loadingCart } = useSelector((state) => state.cart)
  const { removeCart, loadingRemoveAddCart } = useSelector(
    (state) => state.removeCart,
  )
  // useEffect(() => {
  //   dispatch(getCart())
  // }, [getCart])

  // function addToCart(product, quantity) {
  //   commerce.cart
  //     .update(product, quantity + cart.total_items)
  //     .then((json) => console.log(json))
  // }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            counter > 1 && dispatch(decrement())
          }}
        >
          -
        </button>
        <span className={styles.value}>{counter}</span>

        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            dispatch(increment())
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}
//
