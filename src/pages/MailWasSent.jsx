import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navigate } from 'react-router-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { commerce } from '../lib/commerce'
import mailWasSent from '../../src/assets/mailSent.svg'

const MailWasSent = () => {
  const [navigate, setNavigate] = useState(false)
  var token = ''

  let getToken = () => {
    var url = window.location
    var arr = url.href.split('/')
    token = arr[arr.length - 1]
    commerce.customer.getToken(token).then((jwt) => console.log(jwt))
  }

  useEffect(() => {
    getToken()
    setTimeout(() => {
      setNavigate(true)
    }, 33000)
  }, [])

  if (navigate) {
    return <Navigate to="/" />
  }

  return (
    <div>
      {/* <button
        onClick={() => {
          getToken()
        }}
      >
        test
      </button> */}

      <Container className="forgotPassword">
        <Row className="mailwasSentRow">
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
            xl={12}
            xxl={12}
            className="d-flex justify-content-center align-items-center testMail flex-column"
          >
            <div className="mailSentHeader ">
              <h3>
                Məlumatlar mail ünvanınıza göndərildi. Zəhmət olmasa mail
                qutunuzu yoxlayın!
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MailWasSent
