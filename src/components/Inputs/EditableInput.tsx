import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";
import {Input, InputNumber} from 'antd';

interface Props {
  className?: string
  placeholder?: string
  value?: string | number
  onChange: (value: string) => void
}

const EditableInput: FC<Props> = ({className, placeholder, value, onChange}) => {
  const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{value}</Text>
      ) : (
        <Input
          bordered={false}
          size={"small"}
          className={`input ${className}`}
          placeholder={placeholder}
          title={placeholder}
          defaultValue={value}
          onChange={(e)=>onChange(e.target.value)}
        />
      )}
    </>
  )
}

export default EditableInput
