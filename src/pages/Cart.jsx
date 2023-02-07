import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { getCart } from '../redux/features/cartSlice'
import { getRemoveCart } from '../redux/features/removeProductToCartSlice'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { BasketCounter } from '../redux/features/counter/BasketCounter'
import { getUpdateCart } from '../redux/features/updateCartSlice'
import { getDeleteCart } from '../redux/features/deleteCartSlice'
import { Counter } from '../redux/features/counter/Counter'
import { BsTrash } from 'react-icons/bs'
import { commerce } from '../lib/commerce'
import ShoppingCart from '../assets/shoppingCart.svg'
import { Rings } from 'react-loader-spinner'
import CarouselLoader from '../../src/components/Loading/CarouselLoader'

import './Styles/CartPage.css'
import {
  decrement,
  increment,
  toZero,
} from '../redux/features/counter/counterSlice'

const Cart = () => {
  const [ischecked, setIsChecked] = useState(false)
  const navigate = useNavigate()
  const { cart, loadingCart } = useSelector((state) => state.cart)

  const { addCart, loadingAddCart } = useSelector((state) => state.addCart)
  const { removeCart, loadingRemoveAddCart } = useSelector(
    (state) => state.removeCart,
  )
  const { deleteCart, loadingDeleteAddCart } = useSelector(
    (state) => state.deleteCart,
  )
  const { updateCart, loadingUpdateCart } = useSelector(
    (state) => state.updateCart,
  )
  const [count, setCount] = useState(1)
  let [price, setPrice] = useState(0)
  let [permalink, setPermalink] = useState([])
  useEffect(() => {
    localStorage.setItem('permalinks', JSON.stringify(permalink))
  }, [permalink])

  const dispatch = useDispatch()

  const renderEmptyCart = () => (
    <Row variant="subtitle1">
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
  )

  if (!cart.line_items)
    return (
      <div className="cartPageCarouselLoader">
        <CarouselLoader />
      </div>
    )

  const renderCart = () => (
    <>
      <div className="cartMainDiv">
        <div className="cartRow ">
          {cart.line_items.map((lineItem) => (
            <>
              <Card className="cardContainerCart col-12">
                <Col lg={2} xs={12} sm={12} md={12} className="checkbox-img  ">
                  <input
                    type="checkbox"
                    value="isAddedCart"
                    checked="true"
                    className="isAddedCart-checkbox"
                    onClick={(e) => {
                      e.target.checked
                        ? setPrice(price + lineItem?.price?.raw)
                        : setPrice(price - lineItem?.price?.raw)
                      e.target.checked
                        ? setPermalink((permalink) => [
                            ...permalink,
                            lineItem?.permalink,
                          ])
                        : setPermalink(
                            permalink.filter(
                              (el) => el !== lineItem?.permalink,
                            ),
                          )
                      e.target.checked ? console.log(price) : console.log(price)
                    }}
                  />
                  <img
                    className="CardProdImg"
                    style={{ width: '100px' }}
                    src={lineItem?.image?.url}
                  />
                </Col>
                <Col lg={7} xs={8} sm={8} className="d-flex flex-column">
                  <div className="cart-prod-name">
                    <h5>{lineItem.name}</h5>
                  </div>
                  <div className="d-flex cart-color-price">
                    <div className="d-flex cartProdColor">
                      <p> Rəng:</p>
                      <p> Bənövşəyi</p>
                    </div>

                    <div className="d-flex cartProdPrice">
                      <p> Qiymət:</p>
                      <p> {lineItem.price.formatted_with_symbol}</p>
                    </div>
                  </div>
                </Col>

                <Col lg={3} className="trash-counter d-flex">
                  <div className="cartCounter ">
                    <p
                      onClick={() => {
                        setCount(lineItem.quantity - 1)

                        dispatch(
                          getUpdateCart([lineItem.id, lineItem.quantity - 1]),
                        )
                      }}
                    >
                      -
                    </p>

                    <p>{lineItem.quantity}</p>
                    <p
                      onClick={() => {
                        setCount(lineItem.quantity + 1)

                        dispatch(
                          getUpdateCart([lineItem.id, lineItem.quantity + 1]),
                        )
                      }}
                    >
                      +
                    </p>
                  </div>
                  <div
                    className="cart-trashBox d-flex"
                    onClick={() => {
                      dispatch(getRemoveCart(lineItem.id))
                    }}
                  >
                    <BsTrash />
                  </div>
                </Col>
              </Card>
            </>
          ))}
        </div>

        <Col className="TotalAmountCol" lg={3}>
          <Card className="totalAmount">
            <div>
              <p>Ümumi</p>
            </div>
            <div>
              <p>Məbləğ </p>
              <p>{cart?.subtotal?.formatted_with_symbol}</p>
            </div>
            <div>
              <p>Çatdırılma</p>
              <p> 0</p>
            </div>
            <div>
              <p>Hədiyyə paketi</p>
              <p>0</p>
            </div>
            <div>
              <p>Promo kod</p>
              <p>0</p>
            </div>

            <div>
              <p>Cəmi</p>
              <p>{cart?.subtotal?.formatted_with_symbol}</p>
            </div>
          </Card>
        </Col>
      </div>

      <Row>
        <Col lg={12}>
          <div className="checout-epmty-cart">
            <Link
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(getDeleteCart())
              }}
            >
              Səbəti sıfırla
            </Link>
            <Link
              component={Link}
              to="/checkout"
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Sifarişi tamamla
            </Link>
          </div>
        </Col>
      </Row>
    </>
  )

  return <>{!cart.line_items.length ? renderEmptyCart() : renderCart()}</>
}

export default Cart
