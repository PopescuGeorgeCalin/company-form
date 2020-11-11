import React from 'react'
import { Route } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import CompaniesPage from './CompaniesPage'

const headerConfig = {
  namespace: 'vtex-account__companies-list',
  title: <FormattedMessage id="store/my-companies.page" />,
  headerContent: (
    <Button
      variation="primary"
      block
      size="small"
      href="/account#/my-companies/add"
    >
      <FormattedMessage id="store/my-companies.addCompany" />
    </Button>
  ),
}

const MyCompaniesPage = () => {
  return (
    <Route
      path="/my-companies"
      exact
      render={props => <CompaniesPage {...props} headerConfig={headerConfig} />}
    />
  )
}

export default MyCompaniesPage
