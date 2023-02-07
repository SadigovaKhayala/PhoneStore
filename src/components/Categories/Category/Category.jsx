import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../../redux/features/categoriesSlice'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from 'react-grid-carousel'
import './Category.css'
import Card from 'react-bootstrap/Card'
import CarouselLoader from '../../Loading/CarouselLoader'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'

const Category = ({ slugDescription, slug }) => {
  const { categories, loading } = useSelector((state) => state.categories)
  let [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favs')) || [])

  const dispatch = useDispatch()
  const scroll = {
    loop: true,

    scrollSnap: false,
  }
  useEffect(() => {
    dispatch(getCategories(slug))
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
        arrowRight=""
        loop
        className="testCarousel"
        scroll={true}
        scrollSnap={true}
        showDots={false}
        cols={4}
        rows={1}
        infinite={true}
        gap={1}
        autoplay={4000}
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
        {categories?.map((item) => (
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

export default Category
