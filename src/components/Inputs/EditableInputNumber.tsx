import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";
import { InputNumber } from 'antd';

interface Props {
  className?: string
  placeholder?: string
  value?: number
  onChange?: (value: number | string | undefined) => void
}

const EditableInputNumber: FC<Props> = ({className, placeholder, value, onChange}) => {
  const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{value}</Text>
      ) : (
        <InputNumber
          className={`input ${className}`}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
      )}
    </>
  )
}

export default EditableInput
