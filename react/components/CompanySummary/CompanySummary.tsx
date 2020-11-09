import React from 'react'

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
        <span>Nume: </span>
        <span>{companyName}</span>
      </div>
      <div>
        <span>CIF: </span>
        <span>{companyCIF}</span>
      </div>
      <div>
        <span>Adresa: </span>
        <span>{`Judet ${judet}, oras ${oras}, strada ${strada}`}</span>
      </div>
    </div>
  )
}

export default CompanySummary
