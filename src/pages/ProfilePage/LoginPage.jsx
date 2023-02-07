import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { commerce } from '../../lib/commerce'
import axios from 'axios'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import personSignup from '../../../src/assets/loginPage.png'
import { BsEyeFill, BsFacebook } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import './styles/Login.css'

const LoginPage = () => {
  //show password
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
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
  password = watch('password', '')

  let loginProfile = async (data) => {
    await axios.post(
      'https://api.chec.io/v1/customers/email-token',
      {
        email: `${data.mail}`,
        base_url: 'http://localhost:3000/loginSuccsess',
      },
      {
        headers: {
          'X-Authorization': 'sk_49412f105d3bb2e4b2c6ffe20c42cb56b92ec393777dc',
        },
      },
    )

    setNavigate(true)
  }

  const onSubmit = (data) => {
    console.log(data)

    loginProfile(data)
    reset()
  }

  const [navigate, setNavigate] = useState(false)

  //   let getToken = () => {
  //     var url = window.location
  //     var arr = url.href.split('/')
  //     var token = arr[arr.length - 1]
  //     console.log(token)
  //   }

  //     commerce.customer
  //       .login(`${data.mail}`, 'http://localhost:3000/login')
  //       .then((token) => console.log(token))

  // setNavigate(true)
  //}

  if (navigate) {
    return <Navigate to="/mailWasSent" />
  }
  return (
    <div className="login-container">
      <Row>
        <Col
          xs={12}
          md={12}
          sm={12}
          lg={6}
          xl={6}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <div className="loginHeader ">
            <h3>Daxil ol</h3>
          </div>
          <div className="iconContainer">
            <div className="d-flex">
              <BsFacebook className="socialMedia" />
              <p>Facebook ilə</p>
            </div>
            <div className="d-flex">
              <FcGoogle className="socialMedia" />
              <p>Google ilə</p>
            </div>
          </div>

          <div className="or">
            <p> və ya</p>
          </div>

          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mailInput">
              <label>E-mail</label>
              <input
                placeholder="Email"
                type="email"
                {...register('mail', { required: true })}
                aria-invalid={errors.mail ? 'true' : 'false'}
              />
              {errors.mail?.type === 'required' && (
                <p className="alert" role="alert">
                  Mail address is required
                </p>
              )}
            </div>

            <div className="passwordInput">
              <label>Şifrə</label>
              <BsEyeFill
                id="showpass"
                onClick={() => {
                  setToggle2(!toggle2)
                }}
              />

              <input
                className="input-field"
                minLength={'6'}
                size={'44'}
                type={toggle2 ? 'text' : 'password'}
                placeholder="Şifrənizi daxil edin"
                name="cpassword"
                {...register(
                  'cpassword',
                  { required: '**Password is required' },
                  { validate: (value) => value === getValues('password') },
                )}
              ></input>
            </div>
            {errors.mail?.type === 'required' && (
              <p className="alertt" role="alert">
                Password is required
              </p>
            )}
            <div className="resetPassword">
              <Link className="resetPassword" to="/forgotPassword">
                Şifrəni unutmusunuz?
              </Link>
            </div>
            <div className="submitInput">
              <input type="submit" value={'Daxil ol'} />
            </div>
          </form>
        </Col>

        <Col
          xs={12}
          md={12}
          sm={12}
          lg={6}
          xl={6}
          className="d-flex justify-content-center align-items-center LoginRightContainer"
        >
          <div className="login-img">
            <img src={personSignup} alt="" style={{ height: '35vh' }} />
          </div>
          <div className="signupLink">
            <p>Hesabınız yoxdur? </p>
            <Link to="/signup">Qeydiyyatdan keçin</Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
