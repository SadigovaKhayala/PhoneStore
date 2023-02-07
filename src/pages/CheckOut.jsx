import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import './Styles/CheckOutPage.css'
import './Styles/PaymentCard.css'
import { useForm } from 'react-hook-form'
import { commerce } from '../lib/commerce'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdDone } from 'react-icons/md'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import { BsCreditCard2Back, BsCashStack } from 'react-icons/bs'
import { styled } from '@mui/material/styles'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'

const CheckOut = () => {
  let password
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    mode: 'onTouched',
  })
  // accordion

  //useStates
  const [navigate, setNavigate] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})
  const [show, setShow] = useState(false)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const { cart, loadingCart } = useSelector((state) => state.cart)
  password = watch('password', '')

  //fetch functions
  const updateCustomer = (data) => {
    commerce.customer.update(
      {
        email: `${data.mail}`,
        firstname: `${data.firstname}`,
        lastname: `${data.lastname}`,
        phone: `${data.prefiks + data.phone} `,
      },
      localStorage.getItem('commercejs_customer_id'),
    )
  }

  // HandleSubmits
  const onSubmit = async (data, e) => {
    e.preventDefault()
    updateCustomer(data)
    handleOpen()
  }
  const handleOpen = () => {
    setShowProfileDetails(!showProfileDetails) // Toggle accordion
  }
  const handleOpendDelivery = () => {
    setShowDelivery(!showDelivery) // Toggle accordion
  }

  //Handle results

  //useEffects

  //
  useEffect(() => {
    commerce.customer.about().then((customer) => setCustomerInfo(customer))
  }, [])

  // accordion-true-false- components

  const showCustomerDetails = () => (
    <div className="accordionHeaderCustomer d-flex   align-items-flex-start justify-content-flex-start">
      <Col lg={8} className="CustomerCurrentDetails ">
        <h3>1. Şəxsi məlumatlar</h3>
        <div className="d-flex ">
          <p>{customerInfo?.firstname}</p>
          <p>{customerInfo?.lastname}</p>
        </div>
        <p>{customerInfo?.email}</p>
        <p>{customerInfo?.phone}</p>
      </Col>
      <Col
        className="CustomerCurrentButtons  d-flex align-items-center justify-content-center "
        lg={4}
      >
        <p className="p-0 m-0x" onClick={handleOpen}>
          Düzəliş et
        </p>

        <MdDone className="done-btn" onClick={handleOpen} />
      </Col>
    </div>
  )
  const hideCustomerDetails = () => (
    <div className="accordian-header-closed d-flex  align-items-flex-start justify-content-flex-start">
      <Col lg={8} className="CustomerHideDetails ">
        <h3>1. Şəxsi məlumatlar</h3>
      </Col>
      <Col
        className="CustomerClosedButtons  d-flex align-items-center justify-content-center "
        lg={4}
      >
        <p onClick={handleOpen} className="p-0 m-0x">
          Düzəliş et
        </p>

        <MdDone className="edit-btn" onClick={handleOpen} />
      </Col>
    </div>
  )

  const showShippingDetails = () => (
    <div className="accordionHeaderCustomer  d-flex  align-items-flex-start justify-content-flex-start">
      <Col lg={8} className="CustomerCurrentDetails ">
        <h3>2. Çatdırılma</h3>

        <div>
          <p>{deliveryDates?.fullAdress}</p>
          <p>{deliveryDates?.street}</p>
          <p>{deliveryDates?.home}</p>
        </div>
      </Col>
      <Col
        className="CustomerCurrentButtons  d-flex align-items-center justify-content-center "
        lg={4}
      >
        <p onClick={handleOpendDelivery} className="p-0 m-0x">
          Düzəliş et
        </p>

        <MdDone onClick={handleOpendDelivery} className="done-btn" />
      </Col>
    </div>
  )
  const hideShippingDetails = () => (
    <div className="accordian-header-closed d-flex   align-items-flex-start justify-content-flex-start">
      <Col lg={8} className="CustomerHideDetails ">
        <h3>2. Çatdırılma</h3>
      </Col>
      <Col
        className="CustomerClosedButtons  d-flex align-items-center justify-content-center "
        lg={4}
      >
        <p onClick={handleOpendDelivery} className="p-0 m-0x">
          Düzəliş et
        </p>

        <MdDone onClick={handleOpendDelivery} className="edit-btn" />
      </Col>
    </div>
  )

  //paymant
  const deliveryDates = JSON.parse(localStorage.getItem('deliveryAdress'))
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState(
    deliveryDates?.shippingCountry || '',
  )
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()
  const [testCity, setTestCity] = useState('')

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce?.services?.localeListShippingCountries(
      checkoutTokenId,
    )

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      shippingCountry || 'AF',
    )

    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null,
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince },
    )

    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries()
  }, [])

  useEffect(() => {
    fetchSubdivisions(shippingCountry)
  }, [shippingCountry, shippingCountries, testCity])

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkOutTokenId,
        shippingCountry,
        shippingSubdivision,
      )
  }, [shippingSubdivision])

  const onSubmitDelivery = (data) =>
    localStorage.setItem('deliveryAdress', JSON.stringify(data))

  const productPermalink = 'JspwZX'
  let [checkOutTokenId, setCheckOutTokenId] = useState('')
  commerce.checkout
    .generateTokenFrom('permalink', productPermalink)
    .then((response) => setCheckOutTokenId(response.id))

  function captureCheckout() {
    commerce.checkout
      .capture(checkOutTokenId, {
        line_items: {
          item_7RyWOwmK5nEa2V: {
            quantity: 1,
          },
        },
        customer: {
          firstname: customerInfo?.firstname,
          lastname: customerInfo?.lastname,
          email: customerInfo?.email,
        },
        shipping: {
          name: 'International',
          street: deliveryDates?.street,
          town_city: deliveryDates?.home,
          county_state: deliveryDates?.shippingSubdivision,
          postal_zip_code: deliveryDates.zipCode,
          country: deliveryDates?.shippingCountry,
        },
        fulfillment: {
          shipping_method: deliveryDates?.shippingOption,
        },
        billing: {
          name: 'International',
          street: deliveryDates?.street,
          town_city: deliveryDates?.home,
          county_state: deliveryDates?.shippingSubdivision,
          postal_zip_code: deliveryDates.zipCode,
          country: deliveryDates?.shippingCountry,
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '24',
            cvc: '123',
            postal_zip_code: '94107',
          },
        },
      })
      .then((order) => {
        console.log(order)
      })
      .catch((error) => {
        // Something went wrong during capture:
        console.log(error)
      })
  }

  // modal window
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const decoratedOnClick = useAccordionButton('0')

  return (
    <>
      <Container className="checkoutPage">
        <Row className="d-flex justify-content-between align-items-start">
          <h2>Ödəmə</h2>
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <div className="">
              <div className="accordian-header  ">
                <div className="sign">
                  <div>
                    {showProfileDetails
                      ? hideCustomerDetails()
                      : showCustomerDetails()}
                  </div>
                </div>
              </div>
              {showProfileDetails && (
                <div className="accordian-body">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="profileForm"
                  >
                    <div className="inputFormProfile">
                      <label>Ad</label>
                      <input
                        type={'text'}
                        defaultValue={customerInfo.firstname || ''}
                        placeholder="Adınızı daxil edin"
                        {...register('firstname', { required: true })}
                        aria-invalid={errors.firstname ? 'true' : 'false'}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Soyad</label>
                      <input
                        defaultValue={customerInfo.lastname || ''}
                        type={'text'}
                        placeholder="Soyadınızı daxil edin"
                        {...register('lastname', { required: true })}
                        aria-invalid={errors.lastname ? 'true' : 'false'}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>E-mail</label>
                      <input
                        defaultValue={customerInfo.email || ''}
                        placeholder="nümunə@gmail.com"
                        type={'mail'}
                        {...register('mail', { required: true })}
                        aria-invalid={errors.mail ? 'true' : 'false'}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Telefon</label>
                      <select {...register('prefiks')} id="prefics">
                        <option value="070">070</option>
                        <option value="055">055</option>
                        <option value="050">050</option>
                      </select>
                      <input
                        type={'text'}
                        id="telInput"
                        placeholder="000 - 00 - 00"
                        defaultValue={customerInfo?.phone?.substr(3, 9)}
                        {...register('phone', {
                          required: 'Phone number is required',
                        })}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                      ></input>
                    </div>

                    <div className="profileFormSubmit">
                      <input type="submit" value={'Yadda saxla'}></input>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="">
              <div className="accordiann-header  ">
                <div className="sign">
                  <div>
                    {showDelivery
                      ? hideShippingDetails()
                      : showShippingDetails()}
                  </div>
                </div>
              </div>
              {showDelivery && (
                <div className="accordian-body">
                  <form
                    onSubmit={handleSubmit(onSubmitDelivery)}
                    className="profileForm"
                  >
                    <div className="inputFormProfile">
                      <label>Ölkə</label>

                      <select
                        onSelect={(e) => {
                          setShippingCountry(e.target.value)
                          console.log(e.target.value)
                        }}
                        {...register('shippingCountry')}
                      >
                        {Object.entries(shippingCountries)
                          .map(([code, name]) => ({ id: code, label: name }))
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="inputFormProfile">
                      <label>Şəhər</label>

                      <select
                        {...register('shippingSubdivision')}
                        onChange={(e) => setShippingSubdivision(e.target.value)}
                      >
                        {Object.entries(shippingSubdivisions)
                          .map(([code, name]) => ({ id: code, label: name }))
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="inputFormProfile">
                      <label>Küçə</label>
                      <input
                        defaultValue={deliveryDates?.street || ''}
                        type={'text'}
                        placeholder="Küçəni daxil edin "
                        {...register('street')}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Ev</label>
                      <input
                        defaultValue={deliveryDates?.home || ''}
                        type={'text'}
                        placeholder=" Bina 0 ev 0A "
                        {...register('home')}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Tam ünvan </label>
                      <input
                        defaultValue={deliveryDates?.fullAdress || ''}
                        type={'text'}
                        placeholder="Bakı şəhəri Fizuli küç ev 0A"
                        {...register('fullAdress')}
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Zip code </label>
                      <input
                        {...register('zipCode')}
                        defaultValue={deliveryDates?.zipCode || ''}
                        type={'text'}
                        placeholder="Zip kod"
                      />
                    </div>

                    <div className="inputFormProfile">
                      <label>Çatdırılma növü</label>

                      <select
                        {...register('shippingOption')}
                        onChange={(e) => setShippingOption(e.target.value)}
                      >
                        {shippingOptions
                          .map((sO) => ({
                            id: sO.id,
                            label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                          }))
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="profileFormSubmit">
                      <input type="submit" value={'Yadda saxla'}></input>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="accordionHeaderCustomer  d-flex ms-4 align-items-flex-start justify-content-flex-start">
              <Col lg={8} className="CustomerCurrentDetails ">
                <h3>3. Ödəmə üsulu </h3>
              </Col>
              <Col
                className="CustomerCurrentButtons  d-flex align-items-center justify-content-center "
                lg={4}
              >
                <MdDone className="edit-btn ms-5" />
              </Col>
            </div>

            <div className="payWithCard">
              <button
                onClick={() => {
                  handleShow()
                }}
              >
                <BsCreditCard2Back />
                Onlayn kart ilə ödəmə
              </button>

              <button
                onClick={() => {
                  handleShow()
                }}
              >
                <BsCashStack />
                Qapıda nağd ödəmə
              </button>
            </div>
          </Col>

          <Col
            xs={4}
            sm={4}
            md={4}
            lg={3}
            xl={3}
            xxl={3}
            className="TotalAmountCol"
          >
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
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <section class="credit-card visa gr-visa">
          <div class="logo">Visa</div>
          <form>
            <h2>Kart məlumatları</h2>

            <ul class="inputs">
              <li>
                <label>Card Number</label>
                <input
                  type="number"
                  name="card_number"
                  pattern="[0-9]{13,16}"
                  maxLength={20}
                  minLength={20}
                  placeholder="9842 9472 9457 9472"
                  class="full gr-input"
                  required
                />
              </li>
              <li class="expire last">
                <label>Expiration</label>
                <input
                  type="text"
                  name="expire_month"
                  placeholder="December (12)"
                  size="10"
                  class="month gr-input"
                  required
                />
                <input
                  type="text"
                  name="expire_year"
                  placeholder="2023"
                  size="10"
                  class="year gr-input"
                  required
                />
                <div class="clearfix"></div>
              </li>
              <li class="cvc-code last">
                <label>CVC Code</label>
                <input
                  type="text"
                  name="cvc_code"
                  placeholder="145"
                  size="10"
                  class="gr-input"
                  required
                />
              </li>
              <div class="clearfix"></div>
            </ul>
          </form>
          <div class="watermark">Visa</div>
        </section>

        <Button
          onClick={() => {
            captureCheckout()
            setShow(false)
          }}
          className="submitPaymentBtn"
        >
          Təsdiq et
        </Button>
      </Modal>
    </>
  )
}

export default CheckOut
