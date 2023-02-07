import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Category from '../Categories/Category/Category'
import { useSelector } from 'react-redux'
import { getCategories } from '../../redux/features/categoriesSlice'
import Slider1 from './assets/1.jpg'
import Slider2 from './assets/2.webp'
import Slider3 from './assets/3.jpg'
import Slider4 from './assets/4.jpg'
import Slider5 from './assets/5.jpg'
import Cover from './assets/image1.png'
import './Carousel.css'

const MyCarousel = () => {
  const { categories, loadingCategories } = useSelector(
    (state) => state.categories,
  )

  return (
    <Carousel>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          height="652px"
          src={Slider1}
          alt="First slide"
        />
        <Carousel.Caption className="flex smCarouselFlex">
          <div className="buy-sell-header">
            <h3>Buy & Sell What's Now & Next</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
          <img className="carouselCoverimg1" src={Cover} alt="" />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={Slider4}
          alt="First slide"
          height="652px"
        />
        <Carousel.Caption className="flex smCarouselFlex">
          <div className="buy-sell-header">
            <h3>Buy & Sell What's Now & Next</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
          <img className="carouselCoverimg1" src={Cover} alt="" />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={Slider3}
          alt="First slide"
          height="652px"
        />
        <Carousel.Caption className="flex smCarouselFlex">
          <div className="buy-sell-header">
            <h3>Buy & Sell What's Now & Next</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
          <img className="carouselCoverimg1" src={Cover} alt="" />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={Slider5}
          alt="First slide"
          height="652px"
        />
        <Carousel.Caption className="flex smCarouselFlex">
          <div className="buy-sell-header">
            <h3>Buy & Sell What's Now & Next</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
          <img className="carouselCoverimg1" src={Cover} alt="" />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={Slider3}
          alt="First slide"
          height="652px"
        />
        <Carousel.Caption className="flex smCarouselFlex">
          <div className="buy-sell-header">
            <h3>Buy & Sell What's Now & Next</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
          <img className="carouselCoverimg1" src={Cover} alt="" />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default MyCarousel
