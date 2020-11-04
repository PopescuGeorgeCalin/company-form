/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-apollo'
import {
  // @ts-ignore
  ContentWrapper,
  // @ts-ignore
  BaseLoading,
} from 'vtex.my-account-commons'
// @ts-ignore
import { EmptyState, Input, Dropdown, Button } from 'vtex.styleguide'
import ContentBox from '../shared/ContentBox'

import ROU from '../../country'
import CREATE_DOCUMENT from '../../queries/createDocument.graphql'

const headerConfig = {
  titleId: 'my-companies-add.page',
  backButton: {
    titleId: 'my-companies.page',
    path: '/my-companies',
  },
}

const CompaniesPageAdd = () => {
  const [email, setEmail] = useState<string>("")
  const [counties, setCounties] = useState<Array<object>>([])
  const [cities, setCities] = useState<Array<object>>([])
  const [company, setCompany] = useState<any>({
    companyCIF: "",
    companyName: "",
    companyNrRegCom: "",
    bank: "",
    iban: "",
    strada: "",
    judet: "",
    oras: "",
    active: true
  })

  const [
    addDocument,
    { loading: addLoading , error: addError }
  ] = useMutation(CREATE_DOCUMENT);


  useEffect(() => {
    fetch('/no-cache/profileSystem/getProfile')
      .then((response) => response.json())
      .then(async (response) => {
        if (response.IsUserDefined) {
          setEmail(response.Email)
        }
      })
  }, [email])

  useEffect(() => {
    const countyOptions = Object.keys(ROU).map((county: string) => {
      return { value: county, label: county }
    });

    const cityOptions = Object.keys(ROU).reduce((acc: any, county: string) => {
      const countyData = ROU[county].map((city: string) => {
        return { value: city, label: city }
      })
      return {...acc, [county]: countyData }
    }, {})

    setCounties(countyOptions);
    setCities(cityOptions);
  }, []);

  useEffect(() => {
    console.log(addError);
  }, [addError]);

  const updateInputField = ( { target } : { target: HTMLInputElement }): void =>
    setCompany({...company, [target.name]: target.value})

  const updateDropdownField = ({ target } : { target: HTMLInputElement}, value: string): void =>
    setCompany({...company, [target.name]: value})

  const handleAddCompany = () => {
    const fields = Object.keys(company).map((key) => {return {key, value: company[key]}})
    fields.push({key: "email", value: email});
    const document = { fields }
    console.log(document);
    addDocument({
      variables: { acronym: "MC", document }
    })
  }
  return (
    <ContentWrapper {...headerConfig}>
      {() =>
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
              isLoading={addLoading}
              onClick={handleAddCompany}
            >
              Save
            </Button>
          </div>
        </ContentBox>
      }
    </ContentWrapper>

  )
}

export default CompaniesPageAdd
