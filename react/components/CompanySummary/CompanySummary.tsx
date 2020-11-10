import React from 'react'
import { FormattedMessage } from 'react-intl'

interface CompanyProps {
  company: {
    email: string
    companyCIF: string
    companyName: string
    companyNrRegCom: string
    bank: string
    iban: string
    strada: string
    judet: string
    oras: string
    id: string
  }
}

type Props = CompanyProps

const CompanySummary = (props: Props) => {
  const { companyName, companyCIF, strada, judet, oras } = props.company

  return (
    <div className={`address-summary`}>
      <div>
        <span><FormattedMessage id="store/my-companies.tradeName"/></span>
        <span>{companyName}</span>
      </div>
      <div>
        <span><FormattedMessage id="store/my-companies.CIF"/></span>
        <span>{companyCIF}</span>
      </div>
      <div>
        <span><FormattedMessage id="store/my-companies.address"/></span>
        <span>{`Judet ${judet}, oras ${oras}, strada ${strada}`}</span>
      </div>
    </div>
  )
}

export default CompanySummary
