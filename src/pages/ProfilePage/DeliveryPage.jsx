import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import personSignup from '../../../src/assets/loginPage.png'
import { BsEyeFill, BsFacebook, BsGoogle } from 'react-icons/bs'
import './styles/DeliveryAdress.css'
import { FcGoogle } from 'react-icons/fc'
import Container from 'react-bootstrap/Container'
import { commerce } from '../../lib/commerce'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { SlBasket } from 'react-icons/sl'
import { BsHeart, BsPerson } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import Folder from '../../../src/assets/folder.svg'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoMdArrowDropdown } from 'react-icons/io'

import axios from 'axios'
const DeliveryPage = () => {
  let password
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm({
    mode: 'onTouched',
  })
  password = watch('password', '')

  const onSubmit = async (data, e) => {
    e.preventDefault()
    console.log(data)
  }
  const deliveryDates = JSON.parse(localStorage.getItem('deliveryAdress'))
  const productPermalink = 'JspwZX'
  let [checkOutTokenId, setCheckOutTokenId] = useState('')
  commerce.checkout
    .generateTokenFrom('permalink', productPermalink)
    .then((response) => setCheckOutTokenId(response.id))

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState(
    deliveryDates?.shippingCountry || '',
  )
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [counrtySelected, setCountrySelected] = useState('')
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
  }, [shippingCountry, shippingCountries, shippingSubdivisions])

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkOutTokenId,
        shippingCountry,
        shippingSubdivision,
      )
  }, [shippingSubdivision])
  const onSubmitDelivery = (data) => {
    localStorage.setItem('deliveryAdress', JSON.stringify(data))
    console.log(data)
  }
  return (
    <div className="background  ">
      <Row className="m-0 p-0 d-flex align-items-start mt-4 ">
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={3}
          className="leftContainer-d-none mt-5"
        >
          <Card style={{ width: '18rem' }} className="mt-2">
            <Card.Body className="d-flex flex-column profileCategories">
              <Card.Title className="cartHeader">Profilim </Card.Title>

              <Link to={'/profile/orders'}>
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
              <Link to={'/profile/deliveryAdress'} className="activePage">
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
              <p className="headerDropdown"> Çatdırılma ünvanı</p>{' '}
              <IoMdArrowDropdown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={'/profile/orders'}>
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
                <Link to={'/profile/deliveryAdress'} className="activePage">
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
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="responsiveCol">
          <h2 className="headerForm">Çatdırılma ünvanı</h2>

          <form
            onChange={handleSubmit(onSubmitDelivery)}
            className="profileForm"
          >
            <div className="inputFormProfile">
              <label>Ölkə</label>

              <select
                onChange={(e) => {
                  setShippingCountry(e.target.value)
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
              <input type="submit" value={'Yadda saxla'} on></input>
            </div>
          </form>
        </Col>
      </Row>
    </div>
  )
}

export default DeliveryPage
