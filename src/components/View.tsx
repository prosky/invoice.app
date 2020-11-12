import React, { FC } from 'react'
import { View as PdfView } from '@react-pdf/renderer'
import compose from '../styles/compose'
import PageContext from "../model/PageContext";

interface Props {
  className?: string
}

const View: FC<Props> = ({ className, children }) => {
    const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <PdfView style={compose(`view ${className}`)}>{children}</PdfView>
      ) : (
        <div className={`view ${className}`}>{children}</div>
      )}
    </>
  )
}

export default View
