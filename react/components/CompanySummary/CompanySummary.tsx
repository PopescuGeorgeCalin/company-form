import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Company } from '../../typings/utils'

type Props = Company

const CompanySummary = (props: Props) => {
  const { companyName, companyCIF, strada, judet, oras } = props

  return (
    <div className={`address-summary`}>
      <div>
        <span>
          <FormattedMessage id="store/my-companies.tradeName" />:{' '}
        </span>
        <span>{companyName}</span>
      </div>
      <div>
        <span>
          <FormattedMessage id="store/my-companies.CIF" />:{' '}
        </span>
        <span>{companyCIF}</span>
      </div>
      <div>
        <span>
          <FormattedMessage id="store/my-companies.address" />:{' '}
        </span>
        <span>{`Judet ${judet}, oras ${oras}, strada ${strada}`}</span>
      </div>
    </div>
  )
}

export default CompanySummary
