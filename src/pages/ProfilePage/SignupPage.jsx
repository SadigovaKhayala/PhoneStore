import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import personSignup from '../../../src/assets/loginPage.png'
import { BsEyeFill, BsFacebook, BsGoogle } from 'react-icons/bs'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

const SignupPage = () => {
  const [navigate, setNavigate] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  let password
  const navigatee = useNavigate()
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
    console.log(data.mail)
    reset()
    await axios.post(
      'https://api.chec.io/v1/customers',
      {
        email: `${data.mail}`,
        firstname: `${data.firstname}`,
        lastname: `${data.lastname}`,
        phone: `${data.prefiks + data.phone} `,
      },
      {
        headers: {
          'X-Authorization': 'sk_49412f105d3bb2e4b2c6ffe20c42cb56b92ec393777dc',
        },
      },
    )

    await axios.post(
      'https://api.chec.io/v1/customers/email-token',
      {
        email: `${data.mail}`,
        base_url: 'http://localhost:3000/succsessProfile',
      },
      {
        headers: {
          'X-Authorization': 'sk_49412f105d3bb2e4b2c6ffe20c42cb56b92ec393777dc',
        },
      },
    )

    setNavigate(true)
  }

  if (navigate) {
    return <Navigate to="/mailWasSent" />
  }
  return (
    <>
      <Container className="signupContainer">
        <Row className="d-flex signuppContainer align-items-start">
          <Col
            xs={12}
            md={12}
            sm={12}
            lg={6}
            xl={6}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <div className="loginHeader ">
              <h3>Qeydiyyatdan keç</h3>
            </div>
            <div className="iconContainer">
              <div className="d-flex">
                <BsFacebook className="socialMedia" />
                <p>Facebook ilə</p>
              </div>
              <div className="d-flex">
                <BsGoogle className="socialMedia" id="google" />
                <p>Google ilə</p>
              </div>
            </div>

            <div className="or">
              <p> və ya</p>
            </div>

            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="firstnameInput">
                <label>Ad</label>
                <input
                  type={'text'}
                  placeholder="Adınızı daxil edin"
                  {...register('firstname', { required: true })}
                  aria-invalid={errors.firstname ? 'true' : 'false'}
                />
              </div>

              <div className="lastnameInput">
                <label>Soyad</label>
                <input
                  type={'text'}
                  placeholder="Soyadınızı daxil edin"
                  {...register('lastname', { required: true })}
                  aria-invalid={errors.lastname ? 'true' : 'false'}
                />
              </div>

              <div className="mailInput">
                <label>E-mail</label>
                <input
                  placeholder="nümunə@gmail.com"
                  type="email"
                  {...register('mail', { required: true })}
                  aria-invalid={errors.mail ? 'true' : 'false'}
                />
              </div>

              <div className="phoneInput">
                <label>Telefon</label>
                <select {...register('prefiks')} className="prefiks">
                  <option value="070">070</option>
                  <option value="055">055</option>
                  <option value="050">050</option>
                </select>
                <input
                  type={'text'}
                  Length={'8'}
                  id="phoneInput"
                  placeholder="000 - 00 - 00"
                  {...register('phone', {
                    required: 'Phone number is required',
                  })}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                ></input>
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

              <div className="checkBoxInput">
                <input
                  className="checkboxIstifadeciShertleri"
                  value={false}
                  type="checkbox"
                  checked="true"
                  placeholder="checkbox"
                  {...register('checkbox', {})}
                />
                <Link to="">İstifadəçi şərtləri</Link>
                <p>ilə razıyam</p>
              </div>

              <div className="submitInput">
                <input type="submit" value={'Qeydiyyat'} />
              </div>
            </form>
          </Col>

          <Col
            xs={12}
            md={12}
            sm={12}
            lg={6}
            xl={6}
            className="d-flex justify-content-center align-items-center LoginRightContainer mt-5"
          >
            <div className="mt-5 login-img">
              <img src={personSignup} alt="" style={{ height: '35vh' }} />
            </div>
            <div className="signupLink">
              <p>Artıq hesabınız var? </p>
              <Link to="/login">Daxil olun </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SignupPage
