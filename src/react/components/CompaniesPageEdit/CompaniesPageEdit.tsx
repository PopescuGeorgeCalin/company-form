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
import ContentBox from '../shared/ContentBox'
import { useCompaniesQuery } from '../../hooks/useCompaniesQuery'
import { normalizeFields } from '../../helpers'

import ROU from '../../country'
import UPDATE_DOCUMENT from '../../queries/updateDocument.graphql'

const headerConfig = {
  titleId: 'my-companies-add.page',
  backButton: {
    titleId: 'my-companies.page',
    path: '/my-companies',
  },
}

const CompaniesPageEdit = (props:any) => {
  // const history = useHistory();

  const { id }  = props.match?.params;
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [counties, setCounties] = useState<any>({})
  const [cities, setCities] = useState<any>({})
  const [company, setCompany] = useState<any>({})

  const companiesQuery = useCompaniesQuery({
    variables: {
      where: `active=true AND email=${email} AND id=${id}`,
    },
  })

  const [
    updateDocument,
    { loading: editLoading , error: editError }
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted(data) {
      console.log(data)
      props.history.push("/my-companies?success=true")
    },
    onError(err) {
      console.log(err)
    }
  });
  const [
    deleteDocument,
    { loading: deleteLoading , error: deleteError }
  ] = useMutation(UPDATE_DOCUMENT, {
    onCompleted(data) {
      console.log(data)
      props.history.push("/my-companies?success=true")
    },
    onError(err) {
      console.log(err)
    }
  });


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
    if (companiesQuery.loading && email) {
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
    console.log(editError);
  }, [editError]);

  useEffect(() => {
    console.log(deleteError);
  }, [deleteError]);

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
    const fields = Object.keys(company).map((key) => {return {key, value: company[key]}})
    const document = { fields }
    updateDocument({
      variables: { acronym: "MC", document }
    })
  }

  const handleDeleteCompany = () => {
    const document = {
      fields: [
        {"key": "id",     "value": company.id},
        {"key": "active", "value": false}
      ]
    }
    deleteDocument({
      variables: { acronym: "MC", document }
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

export default CompaniesPageEdit
