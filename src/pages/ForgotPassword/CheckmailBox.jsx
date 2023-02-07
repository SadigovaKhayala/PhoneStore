import React from 'react'
import { useForm } from 'react-hook-form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import mailWasSent from '../../../src/assets/mailWasSent.png'
import './Forgot.css'

const CheckmailBox = () => {
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
          xs={12}
          md={12}
          sm={12}
          lg={12}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <div className="loginHeader ">
            <img src={mailWasSent} alt="" />
          </div>
        </Col>

        <Col
          xs={12}
          md={12}
          sm={12}
          lg={12}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <div className="mailSentHeader ">
            <h3>
              E - poçt ünvanınızı yoxlayın. Göndərilmiş linkə keçid edib
              şifrənizi yeniləyin!
            </h3>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckmailBox
