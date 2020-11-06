import { QueryHookOptions, useQuery } from 'react-apollo'

import GET_COMPANY_LIST from '../queries/getCompanyList.graphql'

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

export const useGetCompanyListQuery = (options: QueryHookOptions) =>
  useQuery<Data>(GET_COMPANY_LIST, options)
