import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANIES from '../queries/getCompanies.graphql'

export interface Data {
  documents: Document[]
}

export interface Document {
  id: string
  fields: Field[]
}

export interface Field {
  key: string
  value: string
}

export const useGetCompaniesQuery = (options: QueryHookOptions) =>
  useQuery<Data>(GET_COMPANIES, options)
