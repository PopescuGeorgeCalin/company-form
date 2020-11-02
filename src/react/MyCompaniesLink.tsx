import { FC } from 'react'
import { injectIntl } from 'react-intl'

interface RenderProps {
  name: string
  path: string
}

interface Props {
  render: (paths: RenderProps[]) => any
  intl: any
}

const MyCaregiverLink: FC<Props> = ({ render, intl }: Props) => {
  return render([
    {
      name: intl.formatMessage({ id: 'store/my-companies.link' }),
      path: '/my-companies',
    },
  ])
}

export default injectIntl(MyCaregiverLink)
