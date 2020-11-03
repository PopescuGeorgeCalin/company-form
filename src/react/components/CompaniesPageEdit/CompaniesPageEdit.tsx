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
import { EmptyState, Input, Dropdown, Button } from 'vtex.styleguide'
import ContentBox from '../shared/ContentBox'
import { useCompaniesQuery } from '../../hooks/useCompaniesQuery'
import { normalizeFields } from '../../helpers'
import ROU from '../../country'

const headerConfig = {
  titleId: 'store/my-companies-edit.page',
  backButton: {
    titleId: 'store/my-companies.page',
    path: '/my-companies',
  },
}

const CompaniesPageEdit = (props:any) => {
  const { id }  = props.match?.params; 
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<object>({})
  const [counties, setCounties] = useState<any>({})
  const [cities, setCities] = useState<any>({})
  const [company, setCompany] = useState<any>({
    id: "",
    fields: []
  })

  const companiesQuery = useCompaniesQuery({
    variables: {
      where: `email=${email} AND id=${id}`,
    },
  })


  useEffect(() => {
    if (companiesQuery.loading) {
      setIsLoading(true)
    } else {
      const document = companiesQuery.data?.documents[0];
      if (document) {
        const company = normalizeFields(document);
        setCompany(company)
        setIsLoading(false)
      }
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


  if (isLoading)
    return (
      <BaseLoading queryData={companiesQuery} headerConfig={headerConfig}>
        <SkeletonBox shouldAllowGrowing />
      </BaseLoading>
    )
  
  const updateInputField = ( { target } : { target: HTMLInputElement }): void => 
    setCompany({...company, [target.name]: target.value})
  
  const updateDropdownField = ({ target } : { target: HTMLInputElement}, value: string): void => 
    setCompany({...company, [target.name]: value})

  const handleEditCompany = () => {
    console.log("click edit")
  }

  const handleDeleteCompany = () => {
    console.log("click save")
  }

  return (
    <ContentWrapper {...headerConfig}>
      {() =>
        company ? (
          <ContentBox >
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
                  variation="primary"
                  size="small"
                  onClick={handleEditCompany}
                >
                  Save
                </Button>
              </div>
              <div className="mt5">
                <Button 
                  variation="danger"
                  size="small"
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

export default CompaniesPageEdit
