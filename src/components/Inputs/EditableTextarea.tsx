import React, {FC} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {Text} from '@react-pdf/renderer'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  rows?: number
}

const EditableTextarea: FC<Props> = ({
                                       className,
                                       placeholder,
                                       value,
                                       onChange,
                                       rows,
                                     }) => {
  const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{value}</Text>
      ) : (
        <TextareaAutosize
          minRows={rows || 1}
          className={`input ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  )
}

export default EditableTextarea
