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

import {
  useGetCompaniesQuery,
} from '../../hooks/useGetCompaniesQuery'
import { useGetCompanyListQuery } from '../../hooks/useGetCompanyListQuery'

import CompaniesListItem from '../CompaniesListItem'
import { normalizeFields } from '../../helpers'

const headerConfig = {
  titleId: 'my-companies.page',
  headerContent: (
    <Button variation="primary" block size="small" href="/account#/my-companies/add">
      <FormattedMessage id="my-companies.addCompany" />
    </Button>
  ),
}

const CompaniesPage = (props: any) => {
  const { profile: { Email: email, UserId: userId } } = props;
  const [showToast, setShowToast] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const companyListQuery = useGetCompanyListQuery({
    variables: {
      id: userId
    }
  })

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
    companyListQuery.error && console.log(companyListQuery.error);
  },[companyListQuery])

  useEffect(() => {
    if (companiesQuery.loading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [companiesQuery])

  if (isLoading)
    return (
      <BaseLoading queryData={companyListQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )
  return (
    <ContentWrapper {...headerConfig}>
      {
        () => {
          let jsx;
          if (companyListQuery.data?.document?.id) {
            const document = companyListQuery.data?.document;
            const company = normalizeFields(document);
            const aCompanyIds = company["companyList"].split(',')

            jsx = aCompanyIds.map((companyId: string) => (
              <CompaniesListItem
                id={companyId}
                key={companyId}
              />
            ))
          } else {
            jsx = [<EmptyState key="empty-state" title="Oops.">
              <p>
                Sorry. We couldn't find any companies associated with your user.
              </p>
            </EmptyState>]
          }
          if(showToast) jsx.push(<Toast key="toast-success" messageId="alert.success" onClose={() => setShowToast(false)} />)

          return jsx;
        }
      }
    </ContentWrapper>
  )
}

export default withProfile(CompaniesPage);
