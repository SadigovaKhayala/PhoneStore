import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@material-ui/core/styles'
import { commerce } from '../lib/commerce'
import './Styles/Favorites.css'

import { AiFillHeart } from 'react-icons/ai'

const Favorites = () => {
  let favorites = JSON.parse(localStorage.getItem('favs'))
  const [page, setPage] = useState(1)

  const useStyles = makeStyles(() => ({
    ul: {
      '& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
        background: '#b0efc9',
      },
    },
  }))
  const classes = useStyles()
  let [products, setProducts] = useState([])

  const getAllProducts = () => {
    commerce.products
      .list({
        limit: 10000,
      })
      .then((product) => setProducts(product.data))
  }
  let [favs, setFavs] = useState(JSON.parse(localStorage.getItem('favs')))
  let [prodFavs, setProdFavs] = useState(
    JSON.parse(localStorage.getItem('favs')),
  )

  useEffect(() => {
    getAllProducts()
    setProdFavs([])
    favorites?.forEach((el) => {
      products?.forEach((prod) => {
        prod?.id == el && setProdFavs((prodFavs) => [...prodFavs, prod])
      })
    })
  }, [products])

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favs))
  }, [favs])

  return (
    <div>
      <Container className="categoryProdPage">
        <Row className="filteredProductsRow">
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <div className="categoryPageHeader">
              <h3> {prodFavs?.length} məhsul tapıldı</h3>
            </div>

            <div className="filteredProductsList d-flex align-items-center justify-content-center">
              {prodFavs?.map((el) => (
                <Link to={`/prod/${el?.id}`}>
                  <Card className="filteredCarddd">
                    <AiFillHeart
                      className="absolute-heart"
                      onClick={() => {
                        favs
                          ? favs?.find((e) => e == el?.id)
                            ? setFavs(favs.filter((e) => e !== el?.id))
                            : setFavs((favs) => [...favs, el?.id])
                          : setFavs((favs) => [...favs, el?.id])
                      }}
                    />
                    <Card.Img
                      className="favPageCardImg"
                      variant="top"
                      src={el?.image?.url}
                    />
                    <Link to={`/prod/${el?.id}`}>
                      <Card.Body>
                        <Card.Title className="text-dark">
                          {el?.name}
                        </Card.Title>
                        <Card.Text className="text-dark">
                          {el?.price?.formatted_with_symbol}
                        </Card.Text>
                      </Card.Body>
                    </Link>
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
                count={
                  parseFloat(prodFavs.length / 6).toFixed(0) == 0
                    ? '1'
                    : parseFloat(prodFavs.length / 6).toFixed(0) == 0
                }
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

export default Favorites
