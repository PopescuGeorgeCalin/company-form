import React from 'react'
import { Route } from 'react-router-dom'

import CompaniesPageEdit from './CompaniesPageEdit'

const MyCompaniesPageEdit = () => {
  return <Route path="/my-companies/:id" exact component={CompaniesPageEdit} />
}

export default MyCompaniesPageEdit
