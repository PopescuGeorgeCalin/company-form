import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import ContentBox from '../shared/ContentBox'
import CompanySummary from '../CompanySummary'

interface CompanyProps {
  company: {
    email: string,
    companyCIF: string,
    companyName: string,
    companyNrRegCom: string,
    bank: string,
    iban: string,
    strada: string,
    judet: string,
    oras: string,
    id: string
  }
}

type Props = CompanyProps

const CompaniesListItem: FunctionComponent<Props> = ({company}) => {
  return (
  <div>
    <ContentBox
      btnText={<FormattedMessage id="commons.edit" />}
      btnHref={`/account#/my-companies/${company.id}`}
    >
      <div className="lighter c-muted-2 lh-copy pv4 w5 h4">
          <CompanySummary 
            company={company}
          />
      </div>
    </ContentBox>
  </div>
  )
}

export default CompaniesListItem
