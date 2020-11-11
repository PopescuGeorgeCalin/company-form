/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import {
  // @ts-ignore
  ContentWrapper,
} from 'vtex.my-account-commons'
// @ts-ignore
import { EmptyState } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import Toast from '../shared/Toast'
import withExtraProps from '../hocs/withExtraProps'
import CompaniesListItem from '../CompaniesListItem'
import { PageProps } from '../../typings/utils'

const CompaniesPage = (props: PageProps) => {
  const { companyList, headerConfig } = props
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
                <FormattedMessage id="store/my-companies.companiesNotFound" />
              </p>
            </EmptyState>,
          ]
        }

        if (showToast)
          jsx.push(
            <Toast key="toast-success" onClose={() => setShowToast(false)} />
          )

        return (
          <div className="flex-ns flex-wrap-ns items-start-ns relative tl">
            {jsx}
          </div>
        )
      }}
    </ContentWrapper>
  )
}

export default withExtraProps(CompaniesPage)
