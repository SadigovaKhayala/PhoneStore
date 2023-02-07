import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Cart from '../pages/Cart'

import NavBar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const Layout = () => {
  const { cart, loadingCart } = useSelector((state) => state.cart)
  const { addCart, loadingAddCart } = useSelector((state) => state.addCart)
  const { updateCart, loadingUpdateCart } = useSelector(
    (state) => state.updateCart,
  )
  const { deleteCart, loadingDeleteAddCart } = useSelector(
    (state) => state.deleteCart,
  )

  const [total, setTotal] = useState(cart.total_items)
  useEffect(() => {
    setTotal(cart.total_items)
  }, [loadingAddCart, loadingCart, loadingUpdateCart, cart])

  const isAuth = !!localStorage.getItem('commercejs_customer_id')
  const authValue = {
    isAuth,
  }

  return (
    <div>
      <NavBar totalItems={total} />

      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
