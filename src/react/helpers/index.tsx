import { Document } from '../typings/masterdata'

interface Profile extends Record<string, string> {
  id: string
  name: string
  email: string
}

export const normalizeCustomFields = (fields: Array<Record<string, string>>) =>
  fields.reduce<Record<string, string>>((prev, curr) => {
    const { key, value } = curr

    return { ...prev, [key]: value }
  }, {})

export const documentToProfile = (document: Document): Profile => {
  const { fields, id } = document

  const normalizedFields = fields.reduce<Record<string, string>>(
    (prev, curr) => {
      const { key, value } = curr

      return { ...prev, [key]: value }
    },
    {}
  )

  const { firstName, lastName, email } = normalizedFields
  const name = [firstName, lastName].filter((item) => item).join(' ')

  return { id, name, email, ...normalizedFields }
}
