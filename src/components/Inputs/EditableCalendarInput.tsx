import React, {FC} from 'react'
import {Text} from '@react-pdf/renderer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import compose from '../../styles/compose'
import PageContext from "../../model/PageContext";
import ApplicationContext from "../../model/ApplicationContext";

interface Props {
  className?: string
  value?: string
  selected?: Date
  onChange?: (date: Date | [Date, Date] | null) => void
}

const EditableCalendarInput: FC<Props> = ({className, value,selected, onChange}) => {
  const {pdfMode} = React.useContext(PageContext);
  const {app} = React.useContext(ApplicationContext);
  const {invoice} = app;
  const {dateFormat} = invoice;
  return (
    <>
      {pdfMode ? (
          <Text style={compose(`span ${className}`)}>{value}</Text>) :
        (
          <DatePicker
            className={`input ${className}`}
            selected={selected}
            onChange={onChange ? (date) => onChange(date) : (date) => null}
            dateFormat={dateFormat}/>
        )}
    </>
  )
}

export default EditableCalendarInput
