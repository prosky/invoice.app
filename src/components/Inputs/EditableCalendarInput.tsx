import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";

interface Props {
  className?: string
  value?: string
  dateFormat: string,
  selected?: Date
  onChange?: (date: Date | [Date, Date] | null) => void
}

const EditableCalendarInput: FC<Props> = ({className, value, dateFormat, selected, onChange}) => {
    const {pdfMode} = React.useContext(PageContext);
  return (
    <>
      {pdfMode ? (
          <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>) :
        (
          <DatePicker
            className={'input ' + (className ? className : '')}
            selected={selected}
            onChange={onChange ? (date) => onChange(date) : (date) => null}
            dateFormat={dateFormat}/>
        )}
    </>
  )
}

export default EditableCalendarInput
