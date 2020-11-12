import React, { FC } from 'react'
import { Document as PdfDocument } from '@react-pdf/renderer'
import PageContext from "../model/PageContext";


const Document: FC= ({  children }) => {
    const {pdfMode} = React.useContext(PageContext);
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}

export default Document
