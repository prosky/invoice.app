import React, { FC } from 'react'
import { Text as PdfText } from '@react-pdf/renderer'
import compose from '../styles/compose'
import PageContext from "../model/PageContext";

interface Props {
  className?: string
  children?: string
}

const Text: FC<Props> = ({ className, children }) => {
    const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <PdfText style={compose('span ' + (className ? className : ''))}>{children}</PdfText>
      ) : (
        <span className={'span ' + (className ? className : '')}>{children}</span>
      )}
    </>
  )
}

export default Text
