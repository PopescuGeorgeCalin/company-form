import React from 'react'
import { Route } from 'react-router-dom'

import CompaniesPageAdd from './CompaniesPageAdd'

const MyCompaniesPageAdd = () => {
  return <Route path="/my-companies/add" exact component={CompaniesPageAdd} />
}

export default MyCompaniesPageAdd
