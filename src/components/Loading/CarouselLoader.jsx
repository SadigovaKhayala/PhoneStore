import React from 'react'
import { Rings } from 'react-loader-spinner'

const CarouselLoader = () => {
  return (
    <div className="carouselLoader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default CarouselLoader
