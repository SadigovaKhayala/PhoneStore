import React from 'react'
import ErrorSvg from '../../src/assets/errorPage.svg'
import { Link } from 'react-router-dom'
import './Styles/ErrorPage.css'
const Error = () => {
  return (
    <div className="errorPage">
      <img src={ErrorSvg} alt="" />
      <h4>Opss... Axtardığınız səhifə mövcud deyil</h4>
      <Link>Ana səhifəyə keçid et</Link>
    </div>
  )
}

export default Error
