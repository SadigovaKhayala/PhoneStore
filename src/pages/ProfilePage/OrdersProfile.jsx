import React, { useEffect, useState } from 'react'
import { commerce } from '../../lib/commerce'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
  parsePath,
} from 'react-router-dom'
import { SlBasket } from 'react-icons/sl'
import { BsHeart, BsPerson } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './styles/Orders.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoMdArrowDropdown } from 'react-icons/io'

import ShoppingCart from '../../assets/shoppingCart.svg'

const OrdersProfile = () => {
  let [orderList, setOrderList] = useState([])
  let [orders, setOrders] = useState([])

  useEffect(() => {
    commerce.customer
      .getOrders(localStorage.getItem('commercejs_customer_id'))
      .then((orders) => setOrderList(orders?.data))
      .finally()
  }, [])

  console.log(orderList)

  const navigate = useNavigate()

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

              <Link to={'/profile/orders'} className="activePage">
                <SlBasket />
                <p>Sifarişlərim</p>
              </Link>

              <Link to={'/profile/heart'}>
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
              <p className="headerDropdown"> Sifarişlərim</p>{' '}
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
          <h2 className="headerOrdersContainer">Sifarişlərim</h2>
          <div className="ordersContainer">
            <img src={ShoppingCart}></img>
            <h3>Səbətinizdə hazırda heç bir sifarişiniz yoxdur</h3>
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
    <>
      <Row className="m-0 p-0 d-flex align-items-start justify-content-center ordersRow ">
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          className="leftContainer-d-none pt-1 "
        >
          <Card style={{ width: '18rem' }} className="ms-2 mt-1">
            <Card.Body className="d-flex flex-column profileCategories">
              <Card.Title className="cartHeader">Profilim </Card.Title>

              <Link to={'/profile/orders'} className="activePage">
                <SlBasket />
                <p>Sifarişlərim</p>
              </Link>

              <Link to={'/profile/heart'}>
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
              <p className="headerDropdown ms-4"> Sifarişlərim</p>{' '}
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
        <Col
          xs={12}
          sm={12}
          md={9}
          lg={9}
          xl={9}
          className="rightCol d-flex align-items-start  justify-content-center flex-column"
        >
          <h2 className="headerOrdersContainer">Sifarişlərim</h2>
          <div className="ordersContainerFilled align-items-center justify-content-center p-3 flex-row  flex-wrap">
            {orderList &&
              orderList?.map((prod) =>
                prod?.order?.line_items?.map((el) => {
                  const date = new Date(prod?.created)
                  const dateStr = date.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })

                  return (
                    <Card className="ordersCard">
                      <div className="orderCardImg">
                        <img src={el?.image?.url} alt="" />
                      </div>
                      <div className="ordersCardData ">
                        <div>
                          <p className="fw-bolder">Sifariş tarixi</p>
                          <p>{dateStr}</p>
                        </div>

                        <div>
                          <p className="fw-bolder">Status</p>{' '}
                          <p className="fw-bold"> Yoldadır </p>
                        </div>

                        <div className="d-flex align-items-start justify-content-center">
                          <p className="fw-bolder">Ümumi məbləğ</p>{' '}
                          <p style={{ color: '#DB2C66' }}>
                            {el?.line_total?.raw} ₼
                          </p>
                        </div>

                        <div className="orderDetailsBtn">
                          <button>Sifarişin detalları </button>
                        </div>
                      </div>
                    </Card>
                  )
                }),
              )}
          </div>
        </Col>
      </Row>
    </>
  )

  return (
    <div className="background">
      {orderList?.length !== 0 ? renderOrders() : renderEmptyOrders()}
    </div>
  )
}

export default OrdersProfile
