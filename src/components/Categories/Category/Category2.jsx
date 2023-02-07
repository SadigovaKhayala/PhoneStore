import React, { useState, useEffect } from 'react'
import { Component } from 'react'
import ReactCardCarousel from 'react-card-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getBestseller } from '../../../redux/features/bestsellerSlice'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from 'react-grid-carousel'
import './Category.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { height } from '@mui/system'
import CarouselLoader from '../../Loading/CarouselLoader'
import { BsChevronRight } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
const Category2 = ({ slugDescription }) => {
  const { bestseller, loading } = useSelector((state) => state.bestseller)
  let [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favs')) || [])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBestseller())
  }, [])
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favs))
    console.log(localStorage.getItem('favs'))
  }, [favs])

  return loading == true ? (
    <CarouselLoader />
  ) : (
    <div className="categoryComponent">
      <div className="categoryHeader">
        <h3>{slugDescription}</h3>

        <Link to={`categories/newphones`}>
          Hamısına bax <BsChevronRight />
        </Link>
      </div>
      <Carousel
        className="testCarousel"
        scroll
        draggable={true}
        showDots={false}
        autoplay={4000}
        cols={4}
        rows={1}
        infinite={true}
        loop
        gap={1}
        responsiveLayout={[
          {
            breakpoint: 250000,
            cols: 6,
          },
          {
            breakpoint: 1900,
            cols: 6,
          },
          {
            breakpoint: 1800,
            cols: 4,
          },
          {
            breakpoint: 1200,
            cols: 4,
          },
          {
            breakpoint: 990,
            cols: 2,
          },
          {
            breakpoint: 600,
            cols: 1,
          },
        ]}
        desktopBreakpoint={670}
      >
        {bestseller?.map((item) => (
          <Carousel.Item
            className="carouselItem"
            onDragOver={(e) => e.preventDefault()}
          >
            <Link
              className="carousel-link"
              to={`prod/${item.id}`}
              onDragStart={(e) => {
                e.preventDefault()
              }}
            >
              <Card className="card-for-carousel">
                <Card.Img
                  className="imageRelative"
                  src={item.image.url}
                  onDragStart={(e) => {
                    e.preventDefault()
                  }}
                />
                <Card.Body
                  onDragStart={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.price.formatted_with_symbol}
                    {favs?.find((el) => el == item.id) ? (
                      <AiFillHeart
                        className="filledFav ml-4"
                        onClick={(e) => {
                          e.preventDefault()
                          favs
                            ? favs.find((el) => el == item.id)
                              ? setFavs(favs.filter((el) => el !== item.id))
                              : setFavs((favs) => [...favs, item.id])
                            : setFavs((favs) => [...favs, item.id])
                        }}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="unfilledFav ml-4"
                        onClick={(e) => {
                          e.preventDefault()
                          !favs == 0
                            ? favs.find((el) => el == item.id)
                              ? setFavs(favs.filter((el) => el !== item.id))
                              : setFavs((favs) => [...favs, item.id])
                            : setFavs((favs) => [...favs, item.id])
                        }}
                      />
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="caruselHeaderSm">
        <Link to={`categories/newphones`}>
          Hamısına bax <BsChevronRight />
        </Link>
      </div>
    </div>
  )
}

export default Category2
