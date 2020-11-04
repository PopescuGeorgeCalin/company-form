import { QueryHookOptions, useMutation } from 'react-apollo'

import UPDATE_DOCUMENT from '../queries/updateDocument.graphql'


export interface DocumentResponse {
	id: string
	cacheId: string
	href: String
	documentId: String
}

export const useUpdateDocumentMutation = (options: QueryHookOptions) =>
  useMutation<DocumentResponse>(UPDATE_DOCUMENT, options)
