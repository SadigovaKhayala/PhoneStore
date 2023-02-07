import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import './Card.css'
import Card1 from './assets/card1.png'
import Card2 from './assets/card2.png'
import Card3 from './assets/card3.png'
import { BsChevronRight } from 'react-icons/bs'

const MyCard = () => {
  return (
    <div className="mainCarDcontainer">
      <div className="d-flex m-5 justify-content-around align-items-center  cardFlexDirection ">
        <div className="cardContainer">
          <Card
            className="cardRelative d-flex justify-content-flex-start align-items-left "
            style={{ width: '100%', height: '500px' }}
          >
            <h5 className="p-4">Telefon</h5>
            <p className="ps-4">Məhsul sayı: 22</p>
            <Link
              className="ps-4"
              style={{ color: 'blue' }}
              to="/categories/newphones"
            >
              Məhsullara keçid <BsChevronRight style={{ color: 'blue' }} />
            </Link>
            <Card.Img className="absoluteImg" src={Card1} />
          </Card>
        </div>
        <div className="cardContainer">
          <Card
            className="cardRelative  m-3 d-flex justify-content-flex-start align-items-left "
            style={{ width: '100%', height: '238px' }}
          >
            <h5 className="p-4">Aksesuarlar</h5>
            <p className="ps-4">Məhsul sayı: 6</p>
            <Link
              className="ps-4"
              style={{ color: 'blue' }}
              to="/categories/accsesories"
            >
              Məhsullara keçid
              <BsChevronRight style={{ color: 'blue' }} />
            </Link>
            <Card.Img className="absoluteImg" src={Card2} />
          </Card>
          <Card
            className="cardRelative d-flex m-3 justify-content-flex-start align-items-left "
            style={{ width: '100%', height: '245px' }}
          >
            <h5 className="p-4">Bütün brendlər</h5>
            <p className="ps-4">Məhsul sayı: 58</p>
            <Link
              className="ps-4"
              style={{ color: 'blue' }}
              to="/categories/allBrends"
            >
              Məhsullara keçid <BsChevronRight style={{ color: 'blue' }} />
            </Link>
            <Card.Img className="absoluteImg" src={Card3} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MyCard
