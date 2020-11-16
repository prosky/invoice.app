import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";
import {Input, InputNumber} from 'antd';

interface Props {
  className?: string
  placeholder?: string
  value?: number
  onChange?: (value: number | string | undefined) => void,
  min?:number
}

const EditableInputNumber: FC<Props> = ({className, placeholder, value, onChange,min}) => {
  const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{value}</Text>
      ) : (
        <InputNumber
          min={min}
          size={"small"}
          className={`input ${className}`}
          placeholder={placeholder}
          title={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
      )}
    </>
  )
}

export default EditableInputNumber;
