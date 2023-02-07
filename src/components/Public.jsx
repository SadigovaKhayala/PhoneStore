import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const Public = () => {
  const auth = !!localStorage.getItem('commercejs_customer_id')
  return <>{!auth ? <Outlet /> : <Navigate to="/" />}</>
}

export default Public
