/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import {
  // @ts-ignore
  ContentWrapper,
  // @ts-ignore
  BaseLoading,
  SkeletonBox,
} from 'vtex.my-account-commons'
// @ts-ignore
import { EmptyState, Link, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import Toast from '../shared/Toast'

import { normalizeFields } from '../../helpers'
import { useCompaniesQuery } from '../../hooks/useCompaniesQuery'
import CompaniesListItem from '../CompaniesListItem'

const headerConfig = {
  titleId: 'my-companies.page',
  headerContent: (
    <Button variation="primary" block size="small" href="/account#/my-companies/add">
      <FormattedMessage id="my-companies.addCompany" />
    </Button>
  ),
}

const CompaniesPage = (props: any) => {
  const [showToast, setShowToast] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')

  const companiesQuery = useCompaniesQuery({
    variables: {
      where: `active=true AND email=${email}`,
    },
  })

  useEffect(() => {
    const { location } = props;
    setShowToast(location.search.indexOf('success=true') > -1 )
  }, [])


  useEffect(() => {
    if (companiesQuery.loading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [companiesQuery, email])

  useEffect(() => {
    fetch('/no-cache/profileSystem/getProfile')
      .then((response) => response.json())
      .then(async (response) => {
        if (response.IsUserDefined) {
          setEmail(response.Email)
        }
      })
  }, [email])

  if (isLoading)
    return (
      <BaseLoading queryData={companiesQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )
      console.log(showToast);
  return (
    <ContentWrapper {...headerConfig}>
      {() => {
        const jsx = companiesQuery.data?.documents.length ? (
            companiesQuery.data?.documents.map((document, index) => {
              const company = normalizeFields(document)
              return (
                <CompaniesListItem
                  company={company}
                  key={index}
                />
              )
            })
          )
          : (
            [<EmptyState key="empty-state" title="Oops.">
              <p>
                Sorry. We couldn't find any companies associated with your user.
              </p>
            </EmptyState>]
          )
          if(showToast) jsx.push(<Toast key="toast-success" messageId="alert.success" onClose={() => setShowToast(false)} />)
          return jsx;
        }
      }
    </ContentWrapper>
  )
}

export default CompaniesPage
