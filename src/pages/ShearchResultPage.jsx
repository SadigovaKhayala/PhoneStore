import React, { useEffect, useState } from 'react'
import { commerce } from '../lib/commerce'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Pagination from '@mui/material/Pagination'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'

const ShearchResultPage = () => {
  const [search, setSearch] = useState('')

  const useStyles = makeStyles(() => ({
    ul: {
      '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
        background: '#b0efc9',
      },
    },
  }))
  const classes = useStyles()

  useEffect(() => {
    setSearch(localStorage.getItem('searchValue'))
  }, [localStorage.getItem('searchValue')])

  console.log(search)

  let [products, setProducts] = useState([])
  let [searchedProducts, setSearchedProducts] = useState([])

  useEffect(() => {
    setSearchedProducts([])
    products?.forEach((el) => {
      el?.name?.toLowerCase().includes(search?.toLowerCase())
        ? setSearchedProducts((searchedProducts) => [...searchedProducts, el])
        : console.log('')
    })
  }, [search, products])

  const getAllProducts = () => {
    commerce.products
      .list({
        limit: 10000,
      })
      .then((product) => setProducts(product.data))
  }

  const { posts, loadingPost } = useSelector((state) => state.posts)

  const [sort, setSort] = useState('dateAsc')
  const [page, setPage] = useState(1)
  const elCount = 6
  useEffect(() => {
    getAllProducts()
  }, [products])

  return loadingPost == true ? (
    console.log('loading')
  ) : (
    <div
      className="searchedItems  d-flex align-items-center justify-content-center"
      style={{ width: '100vw' }}
    >
      <Container className="categoryProdPage">
        <Row className="filteredProductsRow">
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div className="categoryPageHeader">
              <h3> {searchedProducts.length} məhsul tapıldı</h3>
              <div>
                <div class="dropdown">
                  <button class="dropbtn">
                    Ən Yenilər{' '}
                    <HiOutlineChevronDown className="active-chevron" />
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

            <div className="filteredProductsList d-flex align-items-center justify-content-center">
              {sort == 'priceAsc'
                ? searchedProducts
                    .slice(elCount * (page - 1), elCount * page)
                    .sort(
                      (a, b) =>
                        parseFloat(a.price.raw) - parseFloat(b.price.raw),
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
                ? searchedProducts
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
                ? searchedProducts
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
                : searchedProducts
                    .slice(6 * (page - 1), 6 * page)
                    .sort(
                      (a, b) => parseFloat(a.created) - parseFloat(b.created),
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
                count={parseFloat(searchedProducts.length / 6).toFixed(0)}
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
    </div>
  )
}

export default ShearchResultPage
