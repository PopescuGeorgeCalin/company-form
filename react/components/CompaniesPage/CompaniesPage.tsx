/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import {
  // @ts-ignore
  ContentWrapper,
} from 'vtex.my-account-commons'
// @ts-ignore
import { EmptyState, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import Toast from '../shared/Toast'
import withProfile from '../hocs/withProfile'
import withCompanyList from '../hocs/withCompanyList'
import CompaniesListItem from '../CompaniesListItem'

const headerConfig = {
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

const CompaniesPage = (props: any) => {
  const { companyList } = props
  const [showToast, setShowToast] = useState<boolean>(false)

  useEffect(() => {
    const { location } = props

    setShowToast(location.search.indexOf('success=true') > -1)
  }, [])

  return (
    <ContentWrapper {...headerConfig}>
      {() => {
        let jsx

        if (companyList?.length) {
          jsx = companyList.map((companyId: string) => (
            <CompaniesListItem id={companyId} key={companyId} />
          ))
        } else {
          jsx = [
            <EmptyState key="empty-state" title="Oops.">
              <p>
                Sorry. We couldn't find any companies associated with your user.
              </p>
            </EmptyState>,
          ]
        }

        if (showToast)
          jsx.push(
            <Toast key="toast-success" onClose={() => setShowToast(false)} />
          )

        return jsx
      }}
    </ContentWrapper>
  )
}

export default withProfile(withCompanyList(CompaniesPage))
