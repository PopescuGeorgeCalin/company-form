/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import {
  // @ts-ignore
  ContentWrapper,
} from 'vtex.my-account-commons'
// @ts-ignore
import { Input, Dropdown, Button } from 'vtex.styleguide'

import ContentBox from '../shared/ContentBox'
import withProfile from '../hocs/withProfile'
import withCompanyList from '../hocs/withCompanyList'
import ROU from '../../country'
import CREATE_DOCUMENT from '../../queries/createDocument.graphql'
import GET_COMPANIES from '../../queries/getCompanies.graphql'
import GET_COMPANY_LIST from '../../queries/getCompanyList.graphql'
import UPDATE_DOCUMENT from '../../queries/updateDocument.graphql'

const headerConfig = {
  titleId: 'my-companies-add.page',
  backButton: {
    titleId: 'my-companies.page',
    path: '/my-companies',
  },
}

const CompaniesPageAdd = (props: any) => {
  const {
    profile: { Email: email, UserId: userId },
    companyList,
  } = props

  const [counties, setCounties] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [company, setCompany] = useState<any>({
    email,
    companyCIF: '',
    companyName: '',
    companyNrRegCom: '',
    bank: '',
    iban: '',
    strada: '',
    judet: '',
    oras: '',
    active: true,
  })

  const [updateDocument] = useMutation(UPDATE_DOCUMENT, {
    onCompleted() {
      props.history.push('/my-companies?success=true')
    },
    onError(err) {
      console.log(err)
    },
    refetchQueries: () => [
      {
        query: GET_COMPANY_LIST,
        variables: {
          id: userId,
        },
      },
    ],
  })

  const [addDocument, { loading: addLoading, error: addError }] = useMutation(
    CREATE_DOCUMENT,
    {
      onCompleted({ createDocument }) {
        // remove first 3 caracters "MC-"
        const newDocumentId = createDocument.id.substring(3)
        const newCompanyList = [...companyList, newDocumentId].join(',')
        const fields = [
          { key: 'id', value: userId },
          { key: 'companyList', value: newCompanyList },
        ]

        const document = { fields }

        updateDocument({
          variables: { acronym: 'ML', document },
        })
      },
      onError(err) {
        console.log(err)
      },
      refetchQueries: () => [
        {
          query: GET_COMPANIES,
          variables: { where: `active=true AND email=${email}` },
        },
      ],
    }
  )

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
    addError && console.log(addError)
  }, [addError])

  const updateInputField = ({ target }: { target: HTMLInputElement }): void =>
    setCompany({ ...company, [target.name]: target.value })

  const updateDropdownField = (
    { target }: { target: HTMLInputElement },
    value: string
  ): void => setCompany({ ...company, [target.name]: value })

  const handleAddCompany = () => {
    const fields = Object.keys(company).map(key => {
      return { key, value: company[key] }
    })

    const document = { fields }

    addDocument({
      variables: { acronym: 'MC', document },
    })
  }

  return (
    <ContentWrapper {...headerConfig}>
      {() => (
        <ContentBox shouldAllowGrowing maxWidthStep={6}>
          <div className="mb5">
            <Input
              placeholder="CIF"
              dataAttributes={{ 'hj-white-list': true, test: 'string' }}
              label="CIFasdas"
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
              isLoading={addLoading}
              onClick={handleAddCompany}
            >
              Save
            </Button>
          </div>
        </ContentBox>
      )}
    </ContentWrapper>
  )
}

export default withProfile(withCompanyList(CompaniesPageAdd))
