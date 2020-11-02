import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANIES from '../queries/Companies.graphql'

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

export const useCompaniesQuery = (options: QueryHookOptions) =>
  useQuery<Data>(GET_COMPANIES, options)
