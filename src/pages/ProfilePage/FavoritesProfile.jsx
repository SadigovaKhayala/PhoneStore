import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { SlBasket } from 'react-icons/sl'
import { BsHeart, BsPerson } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './styles/FavoritesProfile.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GiBrokenHeart } from 'react-icons/gi'
import { AiFillHeart } from 'react-icons/ai'

const FavoritesProfile = () => {
  const navigate = useNavigate()

  let favorites = JSON.parse(localStorage.getItem('favs'))

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
  const renderEmptyOrders = () => (
    <div>
      <Row className="m-0 p-0">
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          className="leftContainer-d-none"
        >
          <Card style={{ width: '18rem' }}>
            <Card.Body className="d-flex flex-column profileCategories">
              <Card.Title className="cartHeader">Profilim </Card.Title>

              <Link to={'/profile/orders'}>
                <SlBasket />
                <p>Sifarişlərim</p>
              </Link>

              <Link to={'/profile/heart'} className="activePage">
                <BsHeart />
                <p>Favorilərim</p>
              </Link>
              <Link to={'/profile/profileDetails'}>
                <BsPerson />
                <p> Şəxsi məlumatlar</p>
              </Link>
              <Link to={'/profile/deliveryAdress'}>
                <GoLocation />
                <p>Çatdırılma ünvanı</p>
              </Link>
              <Link
                to={'/login'}
                onClick={() => {
                  commerce.customer.logout()
                  window.localStorage.clear()
                }}
              >
                <FiLogOut />
                <p> Çıxış</p>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={0}
          lg={0}
          xl={0}
          className="dropdown-profilePage"
        >
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <p className="headerDropdown"> Favorilərim</p>{' '}
              <IoMdArrowDropdown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={'/profile/orders'} className="activePage">
                  <SlBasket />
                  <p>Sifarişlərim</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={'/profile/heart'}>
                  <BsHeart />
                  <p>Favorilərim</p>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={'/profile/profileDetails'}>
                  <BsPerson />
                  <p> Şəxsi məlumatlar</p>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={'/profile/deliveryAdress'}>
                  <GoLocation />
                  <p>Çatdırılma ünvanı</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={'/login'}
                  onClick={() => {
                    commerce.customer.logout()
                    window.localStorage.clear()
                  }}
                >
                  <FiLogOut />
                  <p> Çıxış</p>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="rightCol">
          <h2 className="headerOrdersContainer">Favorilərim</h2>
          <div className="ordersContainer">
            <GiBrokenHeart className="brokenHeart" />
            <h3>Hal-hazırda seçilmiş məhsul tapılmadı</h3>
            <div className="shoppingFormSubmit">
              <input
                type="submit"
                value={'Alış verişə davam et '}
                onClick={() => {
                  navigate('/')
                }}
              ></input>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )

  const renderOrders = () => (
    <div>
      <Row className="m-0 p-0 d-flex favsRow ustify-content-center">
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          className="leftContainer-d-none favsLeftContainer"
        >
          <Card style={{ width: '18rem' }}>
            <Card.Body className="d-flex flex-column profileCategories">
              <Card.Title className="cartHeader">Profilim </Card.Title>

              <Link to={'/profile/orders'}>
                <SlBasket />
                <p>Sifarişlərim</p>
              </Link>

              <Link to={'/profile/heart'} className="activePage">
                <BsHeart />
                <p>Favorilərim</p>
              </Link>
              <Link to={'/profile/profileDetails'}>
                <BsPerson />
                <p> Şəxsi məlumatlar</p>
              </Link>
              <Link to={'/profile/deliveryAdress'}>
                <GoLocation />
                <p>Çatdırılma ünvanı</p>
              </Link>
              <Link
                to={'/login'}
                onClick={() => {
                  commerce.customer.logout()
                  window.localStorage.clear()
                }}
              >
                <FiLogOut />
                <p> Çıxış</p>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={0}
          lg={0}
          xl={0}
          className="dropdown-profilePage"
        >
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <p className="headerDropdown"> Favorilərim</p>{' '}
              <IoMdArrowDropdown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={'/profile/orders'} className="activePage">
                  <SlBasket />
                  <p>Sifarişlərim</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={'/profile/heart'}>
                  <BsHeart />
                  <p>Favorilərim</p>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={'/profile/profileDetails'}>
                  <BsPerson />
                  <p> Şəxsi məlumatlar</p>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link to={'/profile/deliveryAdress'}>
                  <GoLocation />
                  <p>Çatdırılma ünvanı</p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={'/login'}
                  onClick={() => {
                    commerce.customer.logout()
                    window.localStorage.clear()
                  }}
                >
                  <FiLogOut />
                  <p> Çıxış</p>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="rightCol">
          <h2 className="headerOrdersContainer">Favorilərim</h2>
          <div className="favsContainer">
            {prodFavs?.map((el) => (
              <Link to={`/prod/${el?.id}`}>
                <Card
                  style={({ width: '300px' }, { height: '300px' })}
                  className="favCart"
                >
                  <AiFillHeart
                    className="absolute-heart"
                    onClick={() => {
                      favs
                        ? favs.find((e) => e == el?.id)
                          ? setFavs(favs.filter((e) => e !== el?.id))
                          : setFavs((favs) => [...favs, el?.id])
                        : setFavs((favs) => [...favs, el?.id])
                    }}
                  />
                  <Card.Img
                    variant="top"
                    className="favs-card-img"
                    src={el?.image?.url}
                  />
                  <Link to={`/prod/${el?.id}`}>
                    <Card.Body>
                      <Card.Title className="text-dark">{el?.name}</Card.Title>
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
      </Row>
    </div>
  )

  return (
    <div className="background">
      {favs?.length !== 0 ? renderOrders() : renderEmptyOrders()}
    </div>
  )
}

export default FavoritesProfile
