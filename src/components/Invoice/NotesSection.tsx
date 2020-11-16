import View from "../View";
import EditableInput from "../Inputs/EditableInput";
import EditableTextarea from "../Inputs/EditableTextarea";
import React, {FC, useContext} from "react";
import ApplicationContext from "../../model/ApplicationContext";
import {useTranslation} from "react-i18next";
import {InvoiceInterface, InvoiceLabels} from "../../data/types";

interface Props {
  onUpdate: () => void
}

const NotesSection: FC<Props> = ({onUpdate}) => {

  const {t} = useTranslation();
  const {app} = useContext(ApplicationContext);
  const {invoice} = app;

  const handleLabelChange = (name: keyof InvoiceLabels, value: any) => {
    invoice.labels[name] = value;
    onUpdate();
  }
  const handleChange = (name: keyof InvoiceInterface, value: any) => {
    // @ts-ignore
    invoice[name] = value;
    onUpdate();
  }

  return (
    <>
      <View className="mt-20">
        <EditableInput
          className="bold w-100"
          placeholder={t('Notes')}
          value={invoice.labels.notes}
          onChange={(value) => handleLabelChange('notes', value)}
        />
        <EditableTextarea
          className="w-100"
          placeholder={t('It was great doing business with you.')}
          rows={2}
          value={invoice.notes}
          onChange={(value) => handleChange('notes', value)}
        />
      </View>
      <View className="mt-20">
        <EditableInput
          placeholder={t('Terms & Conditions')}
          className="bold w-100"
          value={invoice.labels.terms}
          onChange={(value) => handleLabelChange('terms', value)}
        />
        <EditableTextarea
          className="w-100"
          placeholder={t('Please make the payment by the due date.')}
          rows={2}
          value={invoice.term}
          onChange={(value) => handleChange('term', value)}
        />
      </View>
    </>
  );
}
export default NotesSection;
