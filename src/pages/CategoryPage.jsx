import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { commerce } from '../lib/commerce'
import Accordion from 'react-bootstrap/Accordion'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Loading from '../components/Loading/Loading'
import './Styles/CategoryPage.css'
import './Styles/Selectbox.scss'
import { HiOutlineChevronDown } from 'react-icons/hi'
import Pagination from '@mui/material/Pagination'
import { makeStyles } from '@material-ui/core/styles'
import Stack from '@mui/material/Stack'
import { getPosts } from '../redux/features/postSlice'
import { ChevronLeftFontIcon } from 'react-md'
import { PaginationItem } from '@mui/material'
import { Puff } from 'react-loader-spinner'
import { pink } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import CarouselLoader from '../components/Loading/CarouselLoader'

const Categories = () => {
  const navigate = useNavigate()
  let [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [price, setPrice] = useState({})
  const [filteredProduct, setFilteredProduct] = useState([])
  const [shortBy, setShortBy] = useState('')
  const [defaultSlug, setDefaultSlug] = useState('')
  const { posts, loadingPost } = useSelector((state) => state.posts)
  const [sort, setSort] = useState('dateAsc')
  const [page, setPage] = useState(1)
  const elCount = 6
  const useStyles = makeStyles(() => ({
    ul: {
      '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
        background: '#b0efc9',
      },
    },
  }))
  const classes = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [slug, setSlug] = useState([])

  useEffect(() => {
    let arr = window.location.pathname.split('/')

    setSlug(arr[arr.length - 1] == 'allBrends' ? '' : arr[arr.length - 1])
  }, [window.location.pathname])

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({})

  const getAllProducts = () => {
    commerce.products
      .list({
        limit: 10000,
      })
      .then((product) => setProducts(product.data))
  }

  useEffect(() => {
    checkboxFunc()
  }, [filtered, price, window.location.pathname])

  useEffect(() => {
    getAllProducts()
  }, [filteredProduct, loadingPost, window.location.pathname])

  const changeBrends = handleSubmit((data) => {
    let keys = Object.keys(data)
    setFiltered(
      keys.filter(function (key) {
        return data[key]
      }),
    )
  })

  const changePrice = handleSubmit2((data) => {
    setPrice(data)
  })
  useEffect(() => {
    if (filtered.length == 0 && Object.keys(price).length == 0) {
      setFilteredProduct([])
      products?.forEach((prod) => {
        prod?.categories?.forEach((category) => {
          category.slug == slug &&
            setFilteredProduct((filteredProduct) => [...filteredProduct, prod])
        })
      })
    } else if (filtered.length == 0 && Object.keys(price).length != 0) {
      setFilteredProduct([])
      let min = price.min
      let max = price.max
      min == '' || min == undefined ? (min = 0) : console.log('')
      max == '' || max == undefined
        ? (max = 999999999999999999999999)
        : console.log('')

      products?.forEach((prod) => {
        prod?.categories?.forEach((category) => {
          category.slug == slug &&
          prod.price.raw >= min &&
          prod.price.raw <= max
            ? setFilteredProduct((filteredProduct) => [
                ...filteredProduct,
                prod,
              ])
            : console.log('')
        })
      })
    }
  }, [products, slug, price])

  const checkboxFunc = () => {
    setFilteredProduct([])
    if (filtered.length != 0) {
      products.forEach((el) => {
        el.categories.forEach((category) => {
          for (let i = 0; i <= filtered.length; i++) {
            //products && price
            if (Object.keys(price).length != 0) {
              if (
                category.slug == filtered[i] &&
                el.price.raw >= price.min &&
                el.price.raw <= price.max
              ) {
                setFilteredProduct((filteredProduct) => [
                  ...filteredProduct,
                  el,
                ])
                return filteredProduct
              }
            }
            //no price
            else if (Object.keys(price).length === 0) {
              if (category.slug == filtered[i]) {
                setFilteredProduct((filteredProduct) => [
                  ...filteredProduct,
                  el,
                ])
                return filteredProduct
              }
            }
          }
        })
      })
    }
  }

  const change = handleSubmit((data) => {})
  let filteredProductPagination = (arr) => {
    arr.filter(function (item) {
      return arr.indexOf(item) > 6 * page - 1 && arr.indexOf(item) <= 6 * page
    })
  }

  return loadingPost ? (
    <Container className="loadingCategory">
      <CarouselLoader />
    </Container>
  ) : (
    <Container className="categoryProdPage">
      <Row className="filteredProductsRow">
        <Col xs={12} sm={12} md={12} lg={3} xl={3} className="FilterAccdn">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="SelectboxAccordion">
              <Accordion.Header>Brend(4)</Accordion.Header>
              <Accordion.Body>
                <form
                  onChange={() => {
                    changeBrends()
                  }}
                >
                  <div
                    onClick={() => {
                      navigate('/categories/apple')
                    }}
                  >
                    <Checkbox {...register('apple')} color="success" />

                    <p>Apple</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate('/categories/samsung')
                    }}
                  >
                    <Checkbox {...register('samsung')} color="success" />

                    <p>Samsung</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate('/categories/xiaomi')
                    }}
                  >
                    <Checkbox {...register('xiaomi')} color="success" />
                    <p>Xiaomi</p>
                  </div>

                  <div
                    onClick={() => {
                      navigate('/categories/redme')
                    }}
                  >
                    <Checkbox {...register('redme')} color="success" />

                    <p>Redmi</p>
                  </div>

                  <div
                    onClick={() => {
                      navigate('/categories/honor')
                    }}
                  >
                    <Checkbox {...register('honor')} color="success" />
                    <p>Honor</p>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="SelectboxAccordion">
              <Accordion.Header>Type(3)</Accordion.Header>
              <Accordion.Body>
                <form
                  onChange={() => {
                    changeBrends()
                  }}
                >
                  <div>
                    <Checkbox {...register('notebooklar')} color="success" />

                    <p>Notebooklar</p>
                  </div>
                  <div>
                    <Checkbox {...register('telefon')} color="success" />
                    <p>Telefonlar</p>
                  </div>
                  <div>
                    <Checkbox {...register('accsesories')} color="success" />
                    <p>Aksesuarlar</p>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="SelectboxAccordion">
              <Accordion.Header>Rəng(5)</Accordion.Header>
              <Accordion.Body>
                <form
                  onChange={() => {
                    change()
                  }}
                >
                  <div>
                    <Checkbox {...register('white')} color="success" />
                    <p>Ağ</p>
                  </div>
                  <div>
                    <Checkbox {...register('black')} color="success" />
                    <p>Qara</p>
                  </div>
                  <div>
                    <Checkbox {...register('blue')} color="success" />
                    <p>Göy</p>
                  </div>
                  <div>
                    <Checkbox {...register('red')} color="success" />
                    <p>Qırmızı</p>
                  </div>
                  <div>
                    <Checkbox {...register('green')} color="success" />
                    <p>Yaşıl</p>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3" className="priceAvarage">
              <Accordion.Header>Qiymət</Accordion.Header>
              <Accordion.Body>
                <form
                  onChange={() => {
                    changePrice()
                  }}
                >
                  <div>
                    <p>AZN-dən </p>
                    <input
                      type="number"
                      className="rangePriceInput"
                      {...register2('min')}
                      placeholder="AZN "
                    />
                  </div>
                  <div>
                    <p>AZN-dək</p>
                    <input
                      className="rangePriceInput"
                      type="number"
                      {...register2('max')}
                      placeholder="AZN "
                    />
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="filteredPageEls">
          <div className="categoryPageHeader">
            <h3> {filteredProduct.length} məhsul tapıldı</h3>
            <div>
              <div class="dropdown">
                <button class="dropbtn">
                  Ən Yenilər <HiOutlineChevronDown className="active-chevron" />
                </button>

                <div class="dropdown-content">
                  <option
                    value={'priceAsc'}
                    onClick={(e) => {
                      setSort(e.target.value)
                    }}
                    href="#"
                  >
                    Məbləğə görə
                  </option>
                  <option
                    value={'abcAsc'}
                    onClick={(e) => {
                      setSort(e.target.value)
                    }}
                    href="#"
                  >
                    A-dan Z-yə
                  </option>
                  <option
                    value={'abcDsc'}
                    onClick={(e) => {
                      setSort(e.target.value)
                    }}
                    href="#"
                  >
                    Z-dən A-ya
                  </option>
                </div>
              </div>
            </div>
          </div>

          <div className="filteredProductsList">
            {sort == 'priceAsc'
              ? filteredProduct
                  .slice(elCount * (page - 1), elCount * page)
                  .sort(
                    (a, b) => parseFloat(a.price.raw) - parseFloat(b.price.raw),
                  )
                  .map((el) => (
                    <Link to={`/prod/${el.id}`}>
                      <Card
                        style={({ width: '286px' }, { height: '386px' })}
                        className="filteredCard"
                      >
                        <Card.Img
                          height="210px"
                          width="auto"
                          variant="top"
                          src={el?.image?.url}
                        />
                        <Card.Body>
                          <Card.Title>{el.name}</Card.Title>
                          <Card.Text>
                            {el.price.formatted_with_symbol}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))
              : sort == 'abcAsc'
              ? filteredProduct
                  .slice(6 * (page - 1), 6 * page)
                  .sort(function (a, b) {
                    if (a.name < b.name) {
                      return -1
                    }
                    if (a.name > b.name) {
                      return 1
                    }
                    return 0
                  })
                  .map((el) => (
                    <Link to={`/prod/${el.id}`}>
                      <Card
                        style={({ width: '286px' }, { height: '386px' })}
                        className="filteredCard"
                      >
                        <Card.Img
                          height="210px"
                          width="auto"
                          variant="top"
                          src={el?.image?.url}
                        />
                        <Card.Body>
                          <Card.Title>{el.name}</Card.Title>
                          <Card.Text>
                            {el.price.formatted_with_symbol}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))
              : sort == 'abcDsc'
              ? filteredProduct
                  .slice(6 * (page - 1), 6 * page)
                  .sort(function (a, b) {
                    if (a.name < b.name) {
                      return 1
                    }
                    if (a.name > b.name) {
                      return -1
                    }
                    return 0
                  })
                  .map((el) => (
                    <Link to={`/prod/${el.id}`}>
                      <Card
                        style={({ width: '286px' }, { height: '386px' })}
                        className="filteredCard"
                      >
                        <Card.Img
                          height="210px"
                          width="auto"
                          variant="top"
                          src={el?.image?.url}
                        />
                        <Card.Body>
                          <Card.Title>{el.name}</Card.Title>
                          <Card.Text>
                            {el.price.formatted_with_symbol}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))
              : filteredProduct
                  .slice(6 * (page - 1), 6 * page)
                  .sort((a, b) => parseFloat(a.created) - parseFloat(b.created))
                  .map((el) => (
                    <Link to={`/prod/${el.id}`}>
                      <Card
                        style={({ width: '286px' }, { height: '386px' })}
                        className="filteredCard"
                      >
                        <Card.Img
                          height="210px"
                          width="auto"
                          variant="top"
                          src={el?.image?.url}
                        />
                        <Card.Body>
                          <Card.Title>{el.name}</Card.Title>
                          <Card.Text>
                            {el.price.formatted_with_symbol}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
          </div>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="d-flex alin-items-center justify-content-center mt-5 "
        >
          <Stack spacing={2} className=" mt-5 ">
            <Pagination
              count={parseFloat(filteredProduct.length / 6).toFixed(0)}
              classes={{ ul: classes.ul }}
              onChange={(e, value) => {
                e.preventDefault()
                setPage(value)
              }}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Categories
