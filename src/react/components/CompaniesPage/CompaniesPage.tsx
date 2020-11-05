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
import withProfile from '../hocs/withProfile';

import { normalizeFields } from '../../helpers'
import { useGetCompaniesQuery, Document } from '../../hooks/useGetCompaniesQuery'
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
  const { profile: { Email: email } } = props;
  const [showToast, setShowToast] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(email);
  const companiesQuery = useGetCompaniesQuery({
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
  }, [companiesQuery])

  if (isLoading)
    return (
      <BaseLoading queryData={companiesQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )
  return (
    <ContentWrapper {...headerConfig}>
      {() => {
        const jsx = companiesQuery.data?.documents.length ? (
            companiesQuery.data?.documents.map((document: Document, index: number) => {
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

export default withProfile(CompaniesPage);
