import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import './Card.css'
import iphoneCardImg from './assets/iphn1.png'
import Card2 from './assets/card2.png'
import Card3 from './assets/watch.png'
import { BsChevronRight } from 'react-icons/bs'

const CardFirst = () => {
  return (
    <div className="d-flex m-5 justify-content-around align-items-center  cardFirst ">
      <Card
        className="firstCardRelative  m-3 d-flex justify-content-flex-start align-items-left iphonePower "
        style={{ width: '100%', height: '250px' }}
      >
        <h3 className=" m-1 ms-5 mt-5 mb-3">Iphone 14 gücü</h3>
        <h5 className="  ms-5">Rəngli. Güclü.</h5>

        <h5 className="  ms-5"> Əsl sizə lazım olan</h5>
        <p className="p-1 ms-5 mt-2">1519 AZN </p>

        <Card.Img className="absoluteImgg" src={iphoneCardImg} />
      </Card>
      <Card
        className="firstCardRelative d-flex m-3 justify-content-flex-start align-items-left iphonePower "
        style={{ width: '100%', height: '250px' }}
      >
        <h3 className=" m-1 ms-5 mt-5 mb-3">Macəra dolu saatlar </h3>
        <h5 className="  ms-5">Sizin fitnes dostunuz </h5>

        <h5 className="  ms-5">Həmişə bir addım öndə </h5>
        <p className="p-1 ms-5 mt-2">728 AZN </p>

        <Card.Img className="absoluteImgg" src={Card3} />
      </Card>
    </div>
  )
}

export default CardFirst
