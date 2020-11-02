import React, { useEffect, useState } from 'react'

import { documentToProfile } from '../../helpers'
import { useCompaniesQuery } from '../../hooks/useCompaniesQuery'

interface CompaniesListItemProps {
  companyCIF: string
}

type Props = CompaniesListItemProps

const CompaniesListItem = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { companyCIF } = props

  const companiesQuery = useCompaniesQuery({
    variables: {
      where: `companyCIF=*${companyCIF.replace(/RO/gi, '').trim()}*`,
    },
  })

  useEffect(() => {
    if (companiesQuery.loading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [companiesQuery])

  if (isLoading) return <></>

  return (
    <div>
      {companiesQuery.data?.documents.map((document, index) => {
        const companie = documentToProfile(document)

        return (
          <div key={index} className="mb3">
            {companie.companyName}
          </div>
        )
      })}
    </div>
  )
}

export default CompaniesListItem
