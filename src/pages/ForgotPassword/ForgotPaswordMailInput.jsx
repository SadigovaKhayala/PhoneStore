import React from 'react'
import { useForm } from 'react-hook-form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import fogotPasswordImg from '../../../src/assets/fogotPasswordImg.png'
import './Forgot.css'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { BsEyeFill, BsFacebook } from 'react-icons/bs'

const ForgotPaswordMailInput = () => {
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
    <div className="forgotPassword">
      <Row>
        <Col
          xs={12}
          md={12}
          sm={12}
          lg={6}
          xl={6}
          className="d-flex justify-content-center align-items-center flex-column forgotPasswordInput"
        >
          <div className="loginHeader ">
            <h3>Şifrəmi unutdum</h3>
          </div>
          <div className="headerContainer">
            <p>Doğrulama kodunu almaq üçün e - poçt ünvanınızı daxil edin</p>
          </div>

          <form
            className="m-0 p-0 reset-password-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mailInput m-0 p-0 input-w-100">
              <label>E-mail</label>
              <input
                placeholder="Email"
                className="input-w-100"
                type={'mail'}
                {...register('mail', { required: true })}
                aria-invalid={errors.mail ? 'true' : 'false'}
              />
              {errors.mail?.type === 'required' && (
                <p className="alert" role="alert">
                  Mail address is required
                </p>
              )}
            </div>

            <div className="submitInput m-0 p-0 input-w-100">
              <Link to="/checkMailBox">
                <input
                  type="submit"
                  className="input-w-100 mt-5"
                  value={'Göndər'}
                />
              </Link>
            </div>
          </form>
        </Col>

        <Col
          xs={12}
          md={12}
          sm={12}
          lg={6}
          xl={6}
          className="d-flex justify-content-center align-items-center LoginRightContainer forgot-img-d-none"
        >
          <div>
            <img alt="" src={fogotPasswordImg} style={{ height: '35vh' }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPaswordMailInput
