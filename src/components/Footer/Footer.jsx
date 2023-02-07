import React from 'react'
import './Footer.css'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit'
import Logo from './icons/logo.svg'
import Facebook from './icons/facebook.svg'
import Instagram from './icons/instagram.svg'
import Youtube from './icons/youtube.svg'
import Twitter from './icons/twitter.svg'

const Footer = () => {
  return (
    <div>
      <MDBFooter className="text-center bg-color-dark text-white text-decoration-none   ">
        <section className="">
          <MDBContainer className="text-center text-md-start   ">
            <MDBRow className="mt-1 d-flex align-items-start">
              <MDBCol md="2" lg="3" xl="2" className="mx-auto mb-4 mt-5">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  <img src={Logo} alt="" />
                </h6>
                <div>
                  <ul className="socialMedia">
                    <li>
                      <img src={Facebook} alt="" srcset="" />
                    </li>
                    <li>
                      <img src={Twitter} alt="" srcset="" />
                    </li>
                    <li>
                      <img src={Instagram} alt="" srcset="" />
                    </li>
                    <li>
                      <img src={Youtube} alt="" srcset="" />
                    </li>
                  </ul>
                </div>
              </MDBCol>

              <MDBCol
                md="2"
                lg="2"
                xl="2"
                className="mx-auto mb-4  text-decoration-none mt-5"
              >
                <h6 className="text-uppercase fw-bold mb-4">Menyu</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Yeni
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Endirimlər
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Aksesuarlar
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Bütün Brendlər
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 mt-5">
                <h6 className="text-uppercase fw-bold mb-4">Kömək</h6>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Tez-tez soruşulan suallar
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Çatdırılma xidməti
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset text-decoration-none">
                    Geri qaytarılma şərtləri
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="3" xl="3" className="mx-auto mb-4 mt-5">
                <h6 className="text-uppercase fw-bold mb-4">Əlaqə</h6>
                <p className="d-flex text-sm-left text-xs-left">
                  <img src={Youtube} className="px-2 " />
                  M. K. Ataturk avenue 89, Baku
                </p>
                <p className="d-flex ">
                  <img src={Youtube} className="px-2 " />
                  example@gmail.com
                </p>
                <p className="d-flex">
                  <img src={Youtube} className="px-2 " />
                  *2108
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4 d-flex justify-content-between align-items-center text-center border-gray"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <p>© PeojectX 2021. Bütün hüquqlar qorunur.</p>
          <div className="d-flex justify-content-between align-items-center text-center ">
            <p className="px-2 text-center ">Qaydalar və şərtlər</p>
            <p className="ps-5">Məxfilik siyasəti</p>
          </div>
        </div>
      </MDBFooter>
    </div>
  )
}

export default Footer
