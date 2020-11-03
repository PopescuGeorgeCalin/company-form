import React, { FunctionComponent, ReactElement } from 'react'
import { Button } from 'vtex.styleguide'

const ContentBox: FunctionComponent<Props> = ({
  children,
  maxWidthStep,
  shouldAllowGrowing = false,
  btnText,
  btnHref,
}) => {
  const widthClass = maxWidthStep ? `mw${maxWidthStep}-ns` : ''
  const flexClass = shouldAllowGrowing ? 'flex-auto' : 'flex-none'

  return (
    <div className={`pb5 pr5-ns ${flexClass} ${widthClass}`}>
      <article className="ba bw1 b--muted-4 br2 flex flex-column justify-between">
        <main className="ph7 pv6">{children}</main>
        {btnText && (
          <footer className="flex justify-end ph3 pb3">
            <Button
              variation="tertiary"
              size="small"
              href={btnHref}
            >
              {btnText}
            </Button>
          </footer>
        )}
      </article>
    </div>
  )
}

interface Props {
  maxWidthStep?: number
  shouldAllowGrowing?: boolean
  btnHref?: string
  btnText?: ReactElement
}

export default ContentBox
