/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
// import { useHistory } from "react-router-dom"
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

import ROU from '../../country'
import ContentBox from '../shared/ContentBox'
import withProfile from '../hocs/withProfile'
import withCompanyList from '../hocs/withCompanyList'
import UPDATE_DOCUMENT from '../../queries/updateDocument.graphql'
import UPDATE_COMPANY from '../../queries/updateDocument.graphql'
import GET_COMPANY_LIST from '../../queries/getCompanyList.graphql'
import GET_COMPANY from '../../queries/getCompany.graphql'
import { normalizeFields } from '../../helpers'
import { useGetCompanyQuery } from '../../hooks/useGetCompanyQuery'

const headerConfig = {
  titleId: 'my-companies-add.page',
  backButton: {
    titleId: 'my-companies.page',
    path: '/my-companies',
  },
}

const CompaniesPageEdit = (props: any) => {
  const {
    profile: { UserId: userId },
    companyList,
  } = props

  const { id: companyId } = props.match?.params
  const [counties, setCounties] = useState<any>([])
  const [cities, setCities] = useState<any>([])

  const [company, setCompany] = useState<any>({
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

  const [
    updateDocument,
    { loading: editLoading, error: editError },
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted() {
      props.history.push('/my-companies?success=true')
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
    deleteDocument,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(UPDATE_COMPANY, {
    onCompleted() {
      props.history.push('/my-companies?success=true')
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
    const fields = Object.keys(company).map(key => {
      return { key, value: company[key] }
    })

    const document = { fields }

    updateDocument({
      variables: { acronym: 'MC', document },
    })
  }

  const handleDeleteCompany = () => {
    const newCompanyList = companyList
      .filter((_companyId: string) => _companyId.trim() !== companyId.trim())
      .join(',')

    // document to change the MC entity
    const documentMC = {
      fields: [
        { key: 'id', value: companyId },
        { key: 'active', value: false },
      ],
    }

    // document to change the ML entity
    const documentML = {
      fields: [
        { key: 'id', value: userId },
        { key: 'companyList', value: newCompanyList },
      ],
    }

    console.log({
      variables: {
        documentMC,
        documentML,
      },
    })

    deleteDocument({
      variables: {
        documentMC,
        documentML,
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
                placeholder="CIF"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="CIF"
                name="companyCIF"
                value={company.companyCIF}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                placeholder="Denumire comercială"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Denumire comercială"
                name="companyName"
                value={company.companyName}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                placeholder="Număr registrul comerțului"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Număr registrul comerțului"
                name="companyNrRegCom"
                value={company.companyNrRegCom}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                placeholder="Bancă"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Bancă"
                name="bank"
                value={company.bank}
                onChange={updateInputField}
              />
            </div>
            <div className="mb5">
              <Input
                placeholder="Cont IBAN"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Cont IBAN"
                name="iban"
                value={company.iban}
                onChange={updateInputField}
              />
            </div>

            <div className="mb5">
              <Input
                placeholder="Stradă"
                dataAttributes={{ 'hj-white-list': true, test: 'string' }}
                label="Stradă"
                name="strada"
                value={company.strada}
                onChange={updateInputField}
              />
            </div>

            <div className="mb5">
              <Dropdown
                label="Județ"
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
                Save
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
                Delete
              </Button>
            </div>
          </ContentBox>
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

export default withProfile(withCompanyList(CompaniesPageEdit))
