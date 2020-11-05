import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANY from '../queries/getCompany.graphql'

export interface Document {
  id: string
  fields: Field[]
}

export interface Field {
  key: string
  value: string
}

export const useGetCompanyQuery = (options: QueryHookOptions) =>
  useQuery<Document>(GET_COMPANY, options)
