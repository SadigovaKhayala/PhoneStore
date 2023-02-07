import ReactStars from 'react-stars'
import React from 'react'
import { render } from 'react-dom'
const ratingChanged = (newRating) => {}

const RaitingStar = () => {
  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
      />
    </div>
  )
}
export default RaitingStar
