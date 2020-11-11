import React from 'react'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import CompaniesPageEdit from './CompaniesPageEdit'

const headerConfig = {
  namespace: 'vtex-account__companies-edit',
  title: <FormattedMessage id="store/my-companies-edit.page" />,
  backButton: {
    titleId: 'store/my-companies.page',
    path: '/my-companies',
  },
}

const MyCompaniesPageEdit = () => {
  return (
    <Route
      path="/my-companies/edit/:id"
      exact
      render={props => (
        <CompaniesPageEdit {...props} headerConfig={headerConfig} />
      )}
    />
  )
}

export default MyCompaniesPageEdit
