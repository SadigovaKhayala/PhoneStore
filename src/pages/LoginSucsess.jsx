import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navigate } from 'react-router-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { commerce } from '../lib/commerce'
import mailWasSent from '../../src/assets/sucsess.png'

const LoginSucsess = () => {
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
    }, 3000)
  }, [])

  if (navigate) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Container className="forgotPassword">
        <Row>
          <Col
            xs={12}
            md={12}
            sm={12}
            lg={12}
            className="d-flex justify-content-center align-items-center flex-column loginNavRow"
          >
            <div className="LoginHavHeader mt-5 ">
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
            className="d-flex justify-content-center align-items-center  flex-column "
          >
            <div className="mailWasSentHeader ms-5 ms-5 mt-5 mb-5 ">
              <h3>Siz uğurla daxil oldunuz !</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginSucsess
