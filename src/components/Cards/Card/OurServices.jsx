import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import './Card.css'
import Box from './assets/box.png'
import CardPos from './assets/card-pos.png'
import Medal from './assets/medal-star.png'
import { height } from '@mui/system'

const OurServices = () => {
  return (
    <div className="ourServicesContainer">
      <div className="d-flex m-5 justify-content-around servicesMobile align-items-center ">
        <div className="service ">
          <img src={Box} />
          <h5 className="p-4">Çatdırılma</h5>
          <p className="ps-4">Ünvana Çatdırılma</p>
        </div>
        <div className="service ">
          <img src={CardPos} />
          <h5 className="p-4">Kredit</h5>
          <p className="ps-4">Kredit xidməti</p>
        </div>
        <div className="service">
          <img src={Medal} />
          <h5 className="p-4">Zəmanət</h5>
          <p className="ps-4">Keyfiyyətə zəmanət </p>
        </div>
      </div>
    </div>
  )
}

export default OurServices
