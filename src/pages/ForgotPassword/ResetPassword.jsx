import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Reset from '../../../src/assets/reset.png'
import { BsEyeFill, BsFacebook } from 'react-icons/bs'

import { NavLink, Link, useLocation } from 'react-router-dom'

const ResetPassword = () => {
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

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }
  return (
    <Container className="forgotPassword">
      <Row>
        <Col
          xs={6}
          md={6}
          sm={6}
          lg={6}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <div className="loginHeader ">
            <h3>Şifrəni yenilə</h3>
          </div>
          <div className="headerContainer">
            <p>Hesabınıza yeni şifrə təyin edin</p>
          </div>

          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="passwordInput">
              <div className="passwordInput">
                <label> Yeni Şifrə</label>
                <BsEyeFill
                  id="showpass"
                  onClick={() => {
                    setToggle2(!toggle2)
                  }}
                />

                <input
                  className="input-field"
                  size={'44'}
                  type={toggle2 ? 'text' : 'password'}
                  placeholder="Yeni şifrənizi daxil edin"
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
            </div>

            <div className="submitInput">
              <Link to="/checkMailBox">
                <input type="submit" value={'Təsdiqlə'} />
              </Link>
            </div>
          </form>
        </Col>

        <Col
          xs={6}
          md={6}
          sm={6}
          lg={6}
          className="d-flex justify-content-center align-items-center LoginRightContainer"
        >
          <div>
            <img alt="" src={Reset} style={{ height: '35vh' }} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPassword
