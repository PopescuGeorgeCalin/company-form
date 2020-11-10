/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import {
  // @ts-ignore
  ContentWrapper,
  // @ts-ignore
  BaseLoading,
  SkeletonBox,
} from 'vtex.my-account-commons'
// @ts-ignore
import { EmptyState, Input, Dropdown, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import ROU from '../../country'
import ContentBox from '../shared/ContentBox'
import withExtraProps from '../hocs/withExtraProps'
import UPDATE_DOCUMENT from '../../queries/updateDocument.graphql'
import GET_COMPANY_LIST from '../../queries/getCompanyList.graphql'
import GET_COMPANY from '../../queries/getCompany.graphql'
import { normalizeFields } from '../../helpers'
import { useGetCompanyQuery } from '../../hooks/useGetCompanyQuery'
import { PageProps, Company, Option } from '../../typings/utils'
import { Field } from '../../typings/masterdata'

const CompaniesPageEdit = (props: PageProps) => {
  const {
    profile: { UserId: userId },
    companyList,
    headerConfig,
  } = props

  const { id: companyId } = props.match?.params
  const [counties, setCounties] = useState<Option[]>([])
  const [cities, setCities] = useState<Record<string, Option[]>>({})

  const [company, setCompany] = useState<Company>({
    id: companyId,
    companyCIF: '',
    companyName: '',
    companyNrRegCom: '',
    bank: '',
    iban: '',
    strada: '',
    judet: '',
    oras: '',
  })

  const getCompanyQuery = useGetCompanyQuery({
    variables: {
      id: companyId,
    },
  })

  const goBackWithSuccess = () => {
    props.history.push('/my-companies?success=true')
  }

  const [
    updateDocument,
    { loading: editLoading, error: editError },
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted() {
      goBackWithSuccess()
    },
    onError(err) {
      console.log(err)
    },
    refetchQueries: [
      {
        query: GET_COMPANY,
        variables: { id: companyId },
      },
    ],
  })

  const [
    deleteDocumentML,
    { loading: deleteLoadingML, error: deleteErrorML },
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted() {
      goBackWithSuccess()
    },
    onError(err) {
      console.log(err)
    },
    refetchQueries: () => [
      {
        query: GET_COMPANY_LIST,
        variables: { id: userId },
      },
    ],
  })

  const handleDeleteFromML = () => {
    const newCompanyList = companyList
      .filter((_companyId: string) => _companyId.trim() !== companyId.trim())
      .join(',')

    // document to change the ML entity
    const document = {
      fields: [
        { key: 'id', value: userId },
        { key: 'companyList', value: newCompanyList },
      ],
    }

    deleteDocumentML({
      variables: {
        acronym: 'ML',
        document,
      },
    })
  }

  const [
    deleteDocument,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted: handleDeleteFromML,
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    if (!getCompanyQuery.loading) {
      const document = getCompanyQuery.data?.document

      if (document) {
        const newCompany = normalizeFields(document)

        setCompany({ id: companyId, ...newCompany })
      }
    }
  }, [getCompanyQuery])

  useEffect(() => {
    const countyOptions = Object.keys(ROU).map((county: string) => {
      return { value: county, label: county }
    })

    const cityOptions = Object.keys(ROU).reduce((acc: any, county: string) => {
      const countyData = ROU[county].map((city: string) => {
        return { value: city, label: city }
      })

      return { ...acc, [county]: countyData }
    }, {})

    setCounties(countyOptions)
    setCities(cityOptions)
  }, [])

  useEffect(() => {
    editError && console.log(editError)
  }, [editError])

  useEffect(() => {
    deleteError && console.log(deleteError)
  }, [deleteError])

  if (getCompanyQuery.loading)
    return (
      <BaseLoading queryData={getCompanyQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )

  const updateInputField = ({ target }: { target: HTMLInputElement }): void =>
    setCompany({ ...company, [target.name]: target.value })

  const updateDropdownField = (
    { target }: { target: HTMLInputElement },
    value: string
  ): void => setCompany({ ...company, [target.name]: value })

  const handleEditCompany = () => {
    const fields: Field[] = []

    for (const [key, value] of Object.entries(company)) {
      fields.push({ key, value })
    }

    const document = { fields }

    updateDocument({
      variables: { acronym: 'MC', document },
    })
  }

  const handleDeleteCompany = () => {
    // document to change the MC entity
    const document = {
      fields: [
        { key: 'id', value: companyId },
        { key: 'active', value: false },
      ],
    }

    deleteDocument({
      variables: {
        acronym: 'MC',
        document,
      },
    })
  }

  return (
    <ContentWrapper {...headerConfig}>
      {() =>
        company ? (
          <ContentBox shouldAllowGrowing maxWidthStep={6}>
            <div className="mb5">
              <Input
                label={<FormattedMessage id="store/my-companies.CIF" />}
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="companyCIF"
                value={company.companyCIF}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                label={<FormattedMessage id="store/my-companies.tradeName" />}
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="companyName"
                value={company.companyName}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                label={
                  <FormattedMessage id="store/my-companies.registerNumber" />
                }
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="companyNrRegCom"
                value={company.companyNrRegCom}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                label={<FormattedMessage id="store/my-companies.bank" />}
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="bank"
                value={company.bank}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                label={<FormattedMessage id="store/my-companies.ibanAccount" />}
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="iban"
                value={company.iban}
                onChange={updateInputField}
              />
            </div>

            <div className="mb5">
              <Input
                label={<FormattedMessage id="store/my-companies.street" />}
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                name="strada"
                value={company.strada}
                onChange={updateInputField}
              />
            </div>

            <div className="mb5">
              <Dropdown
                label={<FormattedMessage id="store/my-companies.city" />}
                options={counties}
                name="judet"
                value={company.judet}
                onChange={updateDropdownField}
              />
            </div>

            <div className="mb5">
              <Dropdown
                label="Oraș"
                options={cities[company.judet]}
                name="oras"
                value={company.oras}
                onChange={updateDropdownField}
              />
            </div>

            <div className="mt5">
              <Button
                block
                variation="primary"
                size="small"
                isLoading={editLoading}
                onClick={handleEditCompany}
              >
                <FormattedMessage id="store/commons.save" />
              </Button>
            </div>
            <div className="mt5">
              <Button
                block
                variation="danger"
                size="small"
                isLoading={deleteLoading}
                onClick={handleDeleteCompany}
              >
                <FormattedMessage id="store/commons.delete" />
              </Button>
            </div>
          </ContentBox>
        ) : (
          <EmptyState title="Oops.">
            <p>
              <FormattedMessage id="store/my-companies.companiesNotFound" />
            </p>
          </EmptyState>
        )
      }
    </ContentWrapper>
  )
}

export default withExtraProps(CompaniesPageEdit)
