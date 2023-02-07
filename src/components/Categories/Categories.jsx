import React, { useState, useEffect } from 'react'

import Category from './Category/Category'
import Category2 from './Category/Category2'
import Category3 from './Category/Category3'
import CardFirst from '../Cards/Card/Card1'
const Categories = () => {
  return (
    <div className="categoriesContainer">
      <Category slugDescription={'Yeni gələn telefonlar'} className="mb-2" />
      <CardFirst />
      <Category2
        slugDescription={'Ən çox satılan məhsullar'}
        className="pb-5"
      />

      <Category3 slugDescription={'Yeni gələn aksesuarlar'} className="mb-2" />
    </div>
  )
}

export default Categories
