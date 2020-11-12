import React, { FC } from 'react'
import { Page as PdfPage } from '@react-pdf/renderer'
import compose from '../styles/compose'
import PageContext from "../PageContext";

interface Props {
  className?: string
}

const Page: FC<Props> = ({ className, children }) => {
    const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <PdfPage size="A4" style={compose('page ' + (className ? className : ''))}>
          {children}
        </PdfPage>
      ) : (
        <div className={'page ' + (className ? className : '')}>{children}</div>
      )}
    </>
  )
}

export default Page
