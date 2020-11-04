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

const CompaniesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')

  const companiesQuery = useCompaniesQuery({
    variables: {
      where: `active=true AND email=${email}`,
    },
  })

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

  return (
    <ContentWrapper {...headerConfig}>
      {() =>
        companiesQuery.data?.documents.length ? (
          companiesQuery.data?.documents.map((document, index) => {
            const company = normalizeFields(document)
            return (
              <CompaniesListItem
                company={company}
                key={index}
              />
            )
          })
        ) : (
          <EmptyState title="Oops.">
            <p>
              Sorry. We couldn't find any companies associated with your user.
            </p>
          </EmptyState>
        )
      }
    </ContentWrapper>
  )
}

export default CompaniesPage
