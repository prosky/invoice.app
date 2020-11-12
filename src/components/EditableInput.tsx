import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../styles/compose'
import PageContext from "../PageContext";

interface Props {
  className?: string
  placeholder?: string
  value?: string | number
  onChange?: (value: string) => void
}

const EditableInput: FC<Props> = ({className, placeholder, value, onChange}) => {
  const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{value}</Text>
      ) : (
        <input
          type="text"
          className={`input ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  )
}

export default EditableInput
