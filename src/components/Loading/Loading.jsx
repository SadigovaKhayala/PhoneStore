import React from 'react'
import './Loading.css'
const Loading = () => {
  return (
    <div loaderContainer>
      <div class="loader">
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__bar"></div>
        <div class="loader__ball"></div>
      </div>
    </div>
  )
}

export default Loading
