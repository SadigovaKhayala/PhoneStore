import React from 'react'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-grid-carousel'
import Toshiba from './assets/toshiba.png'
import Acer from './assets/acer.png'
import Bosch from './assets/bosh.png'
import Gorenje from './assets/gorenje.png'
import Philips from './assets/philips.png'
import Hp from './assets/hp.png'
import './Carousel.css'

const LogoCarousel = () => {
  return (
    <div className="logoCarouselBg">
      <Carousel cols={7} rows={1} gap={10} autoplay={4000} loop infinite="true">
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Toshiba} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Bosch} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Gorenje} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Philips} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Hp} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Philips} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Toshiba} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Bosch} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Gorenje} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Philips} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Hp} />
          </Card>
        </Carousel.Item>

        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Toshiba} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Bosch} />
          </Card>
        </Carousel.Item>
        <Carousel.Item style={'border: 4px solid red'}>
          <Card className="logoCarouselItem">
            <img width="80%" src={Philips} />
          </Card>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default LogoCarousel
