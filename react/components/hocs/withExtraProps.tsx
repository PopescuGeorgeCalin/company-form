import React, { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BaseLoading, SkeletonBox } from 'vtex.my-account-commons'
import { useMutation, useLazyQuery } from 'react-apollo'

import GET_COMPANY_LIST from '../../queries/getCompanyList.graphql'
import CREATE_DOCUMENT from '../../queries/createDocument.graphql'
import { normalizeFields } from '../../helpers'
import { Profile } from '../../typings/utils'

export { React }

const headerConfig = {
  titleId: 'store/my-companies.page',
}

const withExtraProps = (WrappedComponent: any): any => ({ ...props }) => {
  const [createDocument, { error }] = useMutation(CREATE_DOCUMENT)
  const [companyList, setCompanyList] = useState<string[]>([])
  const [profile, setProfile] = useState<Profile>({
    Email: '',
    FirstName: '',
    Gender: '',
    IsReturningUser: false,
    IsUserDefined: false,
    LastName: '',
    UserId: '',
  })

  const [getCompanyList, companyListQuery] = useLazyQuery(GET_COMPANY_LIST, {
    variables: { id: profile?.UserId || '-1' },
  })

  useEffect(() => {
    fetch('/no-cache/profileSystem/getProfile')
      .then(response => response.json())
      .then(async response => {
        if (response.IsUserDefined) {
          setProfile(response)
        }
      })
  }, [])

  useEffect(() => {
    if (profile.IsUserDefined) {
      getCompanyList()
    }
  }, [profile])

  useEffect(() => {
    if (companyListQuery?.data?.document?.fields?.length === 0) {
      createDocument({
        variables: {
          acronym: 'ML',
          document: {
            fields: [
              { key: 'id', value: profile?.UserId },
              { key: 'clientEmail', value: profile?.Email },
              { key: 'companyList', value: '' },
            ],
          },
        },
      })
    } else if (companyListQuery.called && !companyListQuery.loading) {
      const document = companyListQuery?.data?.document
      const company = normalizeFields(document)
      const _companyList = company.companyList?.split(',') || []

      setCompanyList(_companyList)
    }
  }, [companyListQuery])

  useEffect(() => {
    error && console.log(error)
  }, [error])

  if (
    !companyListQuery.called ||
    companyListQuery.loading ||
    companyListQuery.error ||
    !companyListQuery.data?.document?.id
  ) {
    return (
      <BaseLoading queryData={companyListQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )
  }

  return (
    <WrappedComponent {...props} profile={profile} companyList={companyList} />
  )
}

export default withExtraProps
