import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { SlBasket } from 'react-icons/sl'
import { BsHeart, BsPerson } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { FiLogOut } from 'react-icons/fi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './styles/infoProfile.css'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import Folder from '../../../src/assets/folder.svg'
import { BsEyeFill, BsFacebook, BsGoogle } from 'react-icons/bs'
import Dropdown from 'react-bootstrap/Dropdown'
import { IoMdArrowDropdown } from 'react-icons/io'

import ShoppingCart from '../../assets/shoppingCart.svg'

const InfoProfile = () => {
  const [navigate, setNavigate] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})

  function deleteAllCookies() {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  let password

  useEffect(() => {
    commerce.customer.about().then((customer) => setCustomerInfo(customer))
  }, [])

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
  password = watch('password', '')

  const onSubmit = async (data, e) => {
    e.preventDefault()
    updateCustomer(data)
    console.log(data)
  }
  return (
    <div className="background ">
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

              <Link to={'/profile/heart'}>
                <BsHeart />
                <p>Favorilərim</p>
              </Link>
              <Link to={'/profile/profileDetails'} className="activePage">
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
                  deleteAllCookies()
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
              <p className="headerDropdown"> Profil</p> <IoMdArrowDropdown />
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
                <Link to={'/profile/profileDetails'} className="activePage">
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
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="responsiveCol">
          <h2 className="headerForm">Şəxsi məlumatlar</h2>
          <div className="formCol">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="profileForm needs-validation"
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
                {errors.firstname && errors.firstname.type === 'required' && (
                  <span>This is required</span>
                )}
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
                {errors.lastname && errors.lastname.type === 'required' && (
                  <span>This is required</span>
                )}
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
                {errors.mail && errors.mail.type === 'required' && (
                  <span>This is required</span>
                )}
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
                  maxLength="8"
                  minLength="8"
                  placeholder="000 - 00 - 00"
                  defaultValue={customerInfo?.phone?.substr(3, 9)}
                  {...register('phone', {
                    required: 'Phone number is required',
                    minLength: 8,
                  })}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                ></input>
                {errors.phone && errors.phone.type === 'required' && (
                  <span>This is required</span>
                )}
              </div>

              <div className="profileFormSubmit">
                <input type="submit" value={'Yadda saxla'}></input>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default InfoProfile
