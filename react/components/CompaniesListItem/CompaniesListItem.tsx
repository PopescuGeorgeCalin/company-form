/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { normalizeFields } from '../../helpers'
import ContentBox from '../shared/ContentBox'
import CompanySummary from '../CompanySummary'
import { useGetCompanyQuery } from '../../hooks/useGetCompanyQuery'

interface CompaniesListItemProps {
  id: string
}

type Props = CompaniesListItemProps

const CompaniesListItem: FunctionComponent<Props> = ({ id }) => {
  const companyQuery = useGetCompanyQuery({
    variables: {
      id,
    },
  })

  const { data, loading, error } = companyQuery

  useEffect(() => {
    error && console.log(error)
  }, [error])

  if (loading || error) return null

  const document = data?.document
  const company = normalizeFields(document)

  return (
    <ContentBox
      btnText={<FormattedMessage id="store/commons.edit" />}
      btnHref={`/account#/my-companies/edit/${id}`}
    >
      <div className="lighter c-muted-2 lh-copy pv4 w5 h4">
        <CompanySummary {...company} />
      </div>
    </ContentBox>
  )
}

export default CompaniesListItem
