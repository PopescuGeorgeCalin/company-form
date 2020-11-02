import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANIES_RELATIONSHIPS from '../queries/CompaniesRelationships.graphql'

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

export const useCompaniesRelationshipsQuery = (options: QueryHookOptions) =>
  useQuery<Data>(GET_COMPANIES_RELATIONSHIPS, options)
