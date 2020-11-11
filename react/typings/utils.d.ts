import { RouteComponentProps } from 'react-router-dom'

export interface Company {
  email?: string
  companyCIF: string
  companyName: string
  companyNrRegCom: string
  bank: string
  iban: string
  strada: string
  judet: string
  oras: string
  id?: string
  active?: boolean
}

export interface Profile {
  Email: string
  FirstName: string | null
  Gender: string | null
  IsReturningUser: boolean
  IsUserDefined: boolean
  LastName: string | null
  UserId: string
}

export interface HeaderConfig {
  title: string | JSX.Element
  backButton?: string | JSX.Element
  headerContent?: string | JSX.Element
}

interface MatchParams {
  id?: string
}

export interface PageProps extends RouteComponentProps<MatchParams> {
  companyList: string[]
  profile: Profile
  headerConfig: HeaderConfig
}

interface Option {
  value: string
  label: string
}
