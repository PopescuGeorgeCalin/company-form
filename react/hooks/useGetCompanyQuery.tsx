import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANY from '../queries/getCompany.graphql'

export interface Data {
  document: Document
}

export interface Document {
  id: string
  fields: Field[]
}

export interface Field {
  key: string
  value: string
}

export const useGetCompanyQuery = (options: QueryHookOptions) =>
  useQuery<Data>(GET_COMPANY, options)
