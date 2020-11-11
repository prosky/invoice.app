import React, {FC, useState} from 'react'
import {Text} from '@react-pdf/renderer'
import compose from '../styles/compose'

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
  pdfMode?: boolean
}

const EditableSelect: FC<Props> = ({
                                     className,
                                     options,
                                     placeholder,
                                     value,
                                     onChange,
                                     pdfMode,
                                   }) => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <>
      {pdfMode ? (
        <Text style={compose(`span ${className || ''}`)}>{value}</Text>
      ) : (
        <>
          {isEditing ? (
            <select
              className={`select ${className || ''}`}
              value={value}
              onChange={onChange ? (e) => onChange(e.target.value) : undefined}
              onBlur={() => setIsEditing(false)}
              autoFocus={true}
            >
              {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          ) : (
            <input
              readOnly={true}
              type="text"
              className={`input ${className || ''}`}
              value={value ? options[value] || '' : ''}
              placeholder={placeholder || ''}
              onFocus={() => setIsEditing(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default EditableSelect
