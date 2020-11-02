import React from 'react'
import { Route } from 'react-router-dom'

import CompaniesPage from './CompaniesPage'

const MyCompaniesPage = () => {
  return <Route path="/my-companies" exact component={CompaniesPage} />
}

export default MyCompaniesPage
