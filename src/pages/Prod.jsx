import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostId } from '../redux/features/ProdIdSlice'
import Card from 'react-bootstrap/Card'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { height, width } from '@mui/system'
import { useParams } from 'react-router-dom'
import '././Styles/Prodstyle.css'
import { Counter } from '../redux/features/counter/Counter'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { BsCart2 } from 'react-icons/bs'
import Rating from '@mui/material/Rating'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import {
  decrement,
  increment,
  toZero,
} from '../redux/features/counter/counterSlice'
import { getAddCart } from '../redux/features/addProductToCartSlice'
import { getCart } from '../redux/features/cartSlice'
import { commerce } from '../lib/commerce'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Prod = () => {
  let removed = []
  const { post, loadingProd } = useSelector((state) => state.post)
  const { cart, loadingCart } = useSelector((state) => state.cart)
  const { addCart, loadingAddCart } = useSelector((state) => state.addCart)
  const counter = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  let [i, setI] = useState(0)
  let [storageIndex, setStorageIndex] = useState(0)
  let [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favs')) || [])
  let [colorVariant, setColorVariant] = useState('')
  let [storage, setStorage] = useState('')
  let classNameColor = ''
  let activeStorage = ''

  useEffect(() => {
    dispatch(getPostId(params.prodId))
  }, [addCart, loadingAddCart])

  let arr = ['']
  post.categories?.forEach((el) => {
    arr.push(el.name)
  })

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return loadingProd == true ? (
    <Loading
      style={
        ({ width: '100vw' }, { backgroundColor: 'red' }, { height: '100vh' })
      }
    />
  ) : (
    <div>
      <Container id="prodContainer">
        <Row className="d-flex flex-d prodPageCont ">
          <Col
            xs={12}
            md={12}
            sm={12}
            lg={12}
            className={'text-black navigationContainer  mt-5'}
          >
            {arr.map((el) => {
              if (el == '') {
                return (
                  <Link
                    className="text-black  text-center pathLink "
                    to={`/${el}`}
                  >
                    Ana Səhifə <AiOutlineRight className="navigationArrow" />
                  </Link>
                )
              } else if (el == 'bestseller') {
                return (
                  <Link
                    className="text-black   text-center pathLink"
                    to={`/categories/${el}`}
                  >
                    Ən çox satılan məhsullar
                    <AiOutlineRight className="navigationArrow" />
                  </Link>
                )
              } else if (el == 'newProducts') {
                return (
                  <Link
                    className="text-black   text-center pathLink"
                    to={`/categories/${el}`}
                  >
                    Yeni gələn məhsullar
                    <AiOutlineRight className="navigationArrow" />
                  </Link>
                )
              } else if (el == 'newAccsesories') {
                return (
                  <Link
                    className="text-black datext-center pathLink"
                    to={`/categories/${el}`}
                  >
                    Yeni gələn aksessuarlar
                    <AiOutlineRight className="navigationArrow" />
                  </Link>
                )
              } else {
                return (
                  <Link
                    className="text-black   text-center pathLink"
                    to={`/categories/${el}`}
                  >
                    {el} <AiOutlineRight className="navigationArrow" />
                  </Link>
                )
              }
            })}
            <Link
              className="text-black datext-center pathLink"
              to={location.pathname}
            >
              {post.name}
            </Link>
          </Col>
        </Row>

        <Row className="d-flex   justify-content-start align-items-start prodInfo">
          <Col xs={12} md={12} sm={12} lg={7} xl={7} className=" ">
            <div className="carouselContainer">
              <div className="currentImgSlide">
                <AiOutlineLeft
                  className="arrowCarousel"
                  onClick={() => {
                    i != 0 ? setI(i - 1) : setI(post?.assets?.length - 1)
                  }}
                />
                <img src={post?.assets?.[i].url} alt="" />
                <AiOutlineRight
                  className="arrowCarousel"
                  onClick={() => {
                    i != 0 ? setI(i - 1) : setI(post?.assets?.length - 1)
                  }}
                />
              </div>

              <div className="subCategoriesImg">
                {post?.assets?.map((img) => {
                  post?.assets?.indexOf(img) == i
                    ? (classNameColor = 'activeColor')
                    : (classNameColor = '')
                  return (
                    <img
                      onClick={() => {
                        console.log(post)
                        setI(post?.assets?.indexOf(img))
                      }}
                      className={'variantImg ' + classNameColor}
                      src={img?.url}
                      alt=""
                    />
                  )
                })}
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={12}
            sm={12}
            lg={5}
            xl={5}
            className="d-flex flex-column justify-content-start align-items-start prodInfo"
          >
            <div className="d-flex flex-row justify-content-start align-items-start prodInfo">
              <h2 className="prodInfoHeader d-flex align-items-center justify-content-center ">
                {post?.name} {colorVariant} {storage}
                {favs?.find((el) => el == post.id) ? (
                  <AiFillHeart
                    className="filledFav ml-4"
                    onClick={() => {
                      favs
                        ? favs.find((el) => el == post.id)
                          ? setFavs(favs.filter((el) => el !== post.id))
                          : setFavs((favs) => [...favs, post.id])
                        : setFavs((favs) => [...favs, post.id])
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    className="unfilledFav ml-4"
                    onClick={() => {
                      !favs == 0
                        ? favs.find((el) => el == post.id)
                          ? setFavs(favs.filter((el) => el !== post.id))
                          : setFavs((favs) => [...favs, post.id])
                        : setFavs((favs) => [...favs, post.id])
                    }}
                  />
                )}
              </h2>
            </div>

            <div className="price-star">
              <div className="d-flex flex-row justify-content-center text-center align-items-center prodInfo raiting-flex">
                <Rating className="d-flex flex-row justify-content-center text-center align-items-center prodInfo " />

                <div className="text-center p-1">(226)</div>
                <div className="text-center p-1 text-primary">57 rəy</div>
              </div>
              <div className="d-flex flex-row justify-content-center text-center align-items-center prodInfo last-current-price">
                <p className="previusPrice m-2 text-center">
                  {post?.price?.formatted_with_symbol}
                </p>
                <p className="currentPrice m-2 text-center">
                  {post?.price?.formatted_with_symbol}
                </p>
              </div>
            </div>
            <hr
              style={{
                width: '100%',
              }}
            />

            <div className="d-flex ps-2 flex-row justify-content-center text-center align-items-center prodInfo">
              <div className="d-flex flex-row  pe-3 justify-content-center text-center align-items-center prodInfo">
                Rəng:
              </div>

              <div className="d-flex flex-row justify-content-center text-center m-2 align-items-center prodInfo">
                {post?.variant_groups?.[0]?.options.map((e) => {
                  post.variant_groups[0].options.indexOf(e) == i
                    ? (classNameColor = 'activeColor')
                    : (classNameColor = '')
                  return (
                    <div
                      className={
                        'colorDiv m-1 d-flex flex-row justify-content-center text-center align-items-center ' +
                        classNameColor
                      }
                      onClick={() => {
                        setI(post.variant_groups[0].options.indexOf(e))
                        setColorVariant(e.name)
                      }}
                      style={{ backgroundColor: `${e.name}` }}
                    ></div>
                  )
                })}
              </div>
            </div>

            <div className="d-flex ps-2  flex-row justify-content-center text-center align-items-center prodInfo ">
              <div className="d-flex flex-row justify-content-center pe-3 text-center align-items-center prodInfo">
                {post?.variant_groups?.[1] ? ' Yaddaş:' : '  '}
              </div>
              <div className="d-flex flex-row justify-content-center text-center align-items-center prodInfo storageResponsiveDiv">
                {post?.variant_groups?.[1]?.options.map((e) => {
                  post?.variant_groups?.[1]?.options.indexOf(e) == storageIndex
                    ? (activeStorage = 'activeStorage')
                    : (activeStorage = '')
                  return (
                    <p
                      onClick={() => {
                        setStorageIndex(
                          post?.variant_groups?.[1]?.options.indexOf(e),
                        )
                        setStorage(e.name)
                      }}
                      className={
                        'storageDiv d-flex justify-content-center align-items-center m-1 ' +
                        activeStorage
                      }
                    >
                      {e.name}
                    </p>
                  )
                })}
              </div>
            </div>

            <div className="d-flex p-2 flex-row justify-content-center text-center align-items-center prodInfo">
              <div className="d-flex  pe-3 flex-row justify-content-center text-center align-items-center prodInfo">
                Miqdar:
              </div>
              <div className="d-flex flex-row justify-content-center text-center align-items-center prodInfo">
                <Counter />
              </div>
            </div>
            <hr
              style={{
                width: '100%',
              }}
            />
            <div className="d-flex flex-row justify-content-center text-center align-items-center prodPageAddBasket prodInfo">
              <button
                className="addToCartBtn"
                onClick={() => {
                  dispatch(getAddCart([post.id, counter]))
                  dispatch(toZero())
                  {
                    commerce.cart.retrieve().then((cart) => {})
                  }
                }}
              >
                <BsCart2 className="prodAddCart" /> <p>Səbətə at</p>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Prod
