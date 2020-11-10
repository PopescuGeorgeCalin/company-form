import React, { useEffect } from 'react'
// @ts-ignore
import { BaseLoading, SkeletonBox } from 'vtex.my-account-commons'
import { useMutation, useQuery } from 'react-apollo'

import GET_COMPANY_LIST from '../../queries/getCompanyList.graphql'
import CREATE_DOCUMENT from '../../queries/createDocument.graphql'
import { normalizeFields } from '../../helpers'

export { React }

const headerConfig = {
  titleId: 'store/my-companies.page',
}

// this HOC must be used in combination with withProfile HOC (ex: withCompanyList(withProfile(ExampleComponent)))
// 		OR any componenet with props: { profile: UserId }
const withCompanyList = (WrappedComponent: any): any => ({ ...props }) => {
  const companyListQuery = useQuery(GET_COMPANY_LIST, {
    variables: { id: props.profile?.UserId || '-1' },
  })

  const [createDocument, { error }] = useMutation(CREATE_DOCUMENT)

  useEffect(() => {
    companyListQuery.error && console.log(companyListQuery.error)
    // if there is no row in ML for the current client, add one
    if (companyListQuery.data?.document?.fields?.length === 0) {
      createDocument({
        variables: {
          acronym: 'ML',
          document: {
            fields: [
              { key: 'id', value: props.profile?.UserId },
              { key: 'clientEmail', value: props.profile?.Email },
              { key: 'companyList', value: '' },
            ],
          },
        },
      })
    }
  }, [companyListQuery])

  useEffect(() => {
    error && console.log(error)
  }, [error])

  if (
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

  const document = companyListQuery?.data?.document
  const company = normalizeFields(document)
  const companyList = company.companyList?.split(',') || []

  return <WrappedComponent {...props} companyList={companyList} />
}

export default withCompanyList
