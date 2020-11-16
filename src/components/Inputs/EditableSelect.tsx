import React, {FC, useState} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";
import {Input, Select} from "antd";

export interface SelectOption {
  value: string
  text: string
}

interface Props {
  className?: string
  options: Record<any, any>
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const EditableSelect: FC<Props> = ({
                                     className,
                                     options,
                                     placeholder,
                                     value,
                                     onChange,
                                   }) => {

    const {pdfMode} = React.useContext(PageContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const text = value ? options[value] || '' : '';

  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className}`)}>{text}</Text>
      ) : (
        <>
          <Select
            showAction={['focus','click']}
            size={"small"}
            bordered={false}
            className={`select ${className}`}
            value={value}
            onChange={onChange ? (value) => onChange(value) : undefined}
            autoFocus={true}>
            {Object.entries(options).map(([key, value]) => (
              <Select.Option key={key} value={key}>{value}</Select.Option>
            ))}
          </Select>
        </>
      )}
    </>
  )
}

export default EditableSelect
