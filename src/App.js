import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './redux/features/postSlice'
import { getCategories } from './redux/features/categoriesSlice'
import { getCart } from './redux/features/cartSlice'
import { getAddCart } from './redux/features/addProductToCartSlice'
import { getRemoveCart } from './redux/features/removeProductToCartSlice'
import { getDeleteCart } from './redux/features/deleteCartSlice'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Products, Navbar, Checkout, Categories } from './components'
import { commerce } from './lib/commerce'
import { Routes, Route, browserRouter, Link } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Prod from './pages/Prod'
import CategoryPage from './pages/CategoryPage'
import ProfilePage from './pages/ProfilePage/OrdersProfile'
import LoginPage from './pages/ProfilePage/LoginPage'
import SignupPage from './pages/ProfilePage/SignupPage'
import LoginSucsess from './pages/LoginSucsess'
import ForgotPaswordMailInput from './pages/ForgotPassword/ForgotPaswordMailInput'
import CheckmailBox from './pages/ForgotPassword/CheckmailBox'
import ResetPassword from './pages/ForgotPassword/ResetPassword'
import OrdersProfile from './pages/ProfilePage/OrdersProfile'
import InfoProfile from './pages/ProfilePage/InfoProfile'
import Private from './components/Private'
import DeliveryPage from './pages/ProfilePage/DeliveryPage'
import CheckOut from './pages/CheckOut'
import Error from './pages/Error'
import ShearchResultPage from './pages/ShearchResultPage'
import Public from './components/Public'
import Favorites from './pages/Favorites'
import FavoritesProfile from './pages/ProfilePage/FavoritesProfile'
import MailWasSent from './pages/MailWasSent'
const App = () => {
  const dispatch = useDispatch()

  const { posts, loadingPost } = useSelector((state) => state.posts)
  const { cart, loadingCart } = useSelector((state) => state.cart)
  const { addCart, loadingAddCart } = useSelector((state) => state.addCart)
  const { updateCart, loadingUpdateCart } = useSelector(
    (state) => state.updateCart,
  )
  const { deleteCart, loadingDeleteAddCart } = useSelector(
    (state) => state.deleteCart,
  )
  useEffect(() => {
    dispatch(getPosts())
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    dispatch(getCart())
  }, [loadingUpdateCart, loadingCart, loadingAddCart, loadingDeleteAddCart])

  //checkout
  const [checkOutToken, setCheckOutToken] = useState('')

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart?.id, {
          type: 'cart',
        })

        localStorage.setItem('checkOutToken', token.id)
      } catch (error) {}
    }
    generateToken()
  }, [])

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/prod/:prodId" element={<Prod />} />
        <Route path="/categories/:prodId" element={<CategoryPage />} />
        <Route path="/loginSuccsess/:id" element={<LoginSucsess />} />
        <Route path="/search" element={<ShearchResultPage />} />
        <Route path="/mailWasSent" element={<MailWasSent />} />

        <Route path="/*" element={<Error />} />
        <Route element={<Public />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignupPage />} />
        </Route>
        <Route element={<Private />}>
          <Route path="/forgotPassword" element={<ForgotPaswordMailInput />} />
          <Route path="/checkMailBox" element={<CheckmailBox />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile/orders" element={<OrdersProfile />} />
          <Route path="/profile/profileDetails" element={<InfoProfile />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/deliveryAdress" element={<DeliveryPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile/heart" element={<FavoritesProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
