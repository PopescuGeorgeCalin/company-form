import React from 'react'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import CompaniesPageAdd from './CompaniesPageAdd'

const headerConfig = {
  title: <FormattedMessage id="store/my-companies-add.page" />,
  backButton: {
    titleId: 'store/my-companies.page',
    path: '/my-companies',
  },
}

const MyCompaniesPageAdd = () => {
  return (
    <Route
      path="/my-companies/add"
      exact
      render={props => (
        <CompaniesPageAdd {...props} headerConfig={headerConfig} />
      )}
    />
  )
}

export default MyCompaniesPageAdd
