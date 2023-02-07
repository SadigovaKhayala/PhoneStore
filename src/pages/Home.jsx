import React, { useState, useEffect } from 'react'

import { Products, Navbar, Cart, Checkout, Categories } from '../components'

import MyCarousel from '../components/Carousel/Carousel'
import Cards from '../components/Cards/Cards'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const Home = () => {
  return (
    <>
      <MyCarousel />
      <Categories />
      <Cards />
    </>
  )
}
export default Home
