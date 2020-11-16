import React, {FC, useContext} from 'react'
import {InvoiceLabels} from '../data/types'
import EditableInput from './Inputs/EditableInput'
import EditableCalendarInput from './Inputs/EditableCalendarInput'
import Document from './Document'
import Page from './Page'
import View from './View'
import {Font} from "@react-pdf/renderer";
import PageContext from "../model/PageContext";
import ApplicationContext from "../model/ApplicationContext";
import {useTranslation} from 'react-i18next';
import CompanySection from "./Invoice/CompanySection";
import NotesSection from "./Invoice/NotesSection";
import Invoice from "../classes/Invoice";
import ProductsSection from "./Invoice/ProductsSection";
import Company from "../classes/Company";


interface Props {
  pdfMode: boolean
  locale?: string
  data?: Invoice
  onUpdate?: () => void
}

Font.register({
  family: 'Nunito',
  fonts: [
    {src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf'},
    {src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf', fontWeight: 600},
  ],
});

const createDate = (val: string, defaultDate: Date = new Date()): Date => {
  return val ? new Date(val) : new Date(defaultDate);
};


const InvoicePage: FC<Props> = ({pdfMode, onUpdate = () => undefined, data}) => {

  const {t} = useTranslation();
  const {app} = useContext(ApplicationContext);
  const {invoice: contextData, formatter} = app;
  const invoice = data || contextData;
  const {date: formatDate} = formatter;

  const update = () => {
    onUpdate();
  }

  const invoiceDate = createDate(invoice.date);
  const invoiceDueDate = createDate(invoice.dueDate, invoiceDate);

  if (invoice.dueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  const handleLabelChange = (name: keyof InvoiceLabels, value: any) => {
    invoice.labels[name] = value;
  }

  const handleChange = (name: keyof Invoice, value: any) => {
    Object.assign(app.invoice, {[name]: value});
    update();
  }

  return (
    <PageContext.Provider value={{pdfMode}}>
      <Document>
        <Page className="invoice-wrapper">
          <View className="flex ">
            <View className="w-50">
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.labels.title}
                    onChange={(value) => handleLabelChange('title', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableInput
                    placeholder={t("INV-12")}
                    value={invoice.title}
                    onChange={(value) => handleChange('title', value)}
                  />
                </View>
              </View>
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.labels.date}
                    onChange={(value) => handleLabelChange('date', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableCalendarInput
                    value={formatDate(invoiceDate)}
                    selected={invoiceDate}
                    onChange={(date) => handleChange('date', formatDate(date))}
                  />
                </View>
              </View>
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.labels.dueDate}
                    onChange={(value) => handleLabelChange('dueDate', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableCalendarInput
                    value={formatDate(invoiceDueDate)}
                    selected={invoiceDueDate}
                    onChange={(date) => handleChange('dueDate', formatDate(date))}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="flex mt-20">
            <View className="w-50">
              <EditableInput
                className="bold dark mb-5"
                value={invoice.labels.company}
                onChange={(value) => handleLabelChange('company', value)}
              />
              <CompanySection company={invoice.company}
                              onChange={(value: Company) => handleChange('company', value)}/>
              <EditableInput
                placeholder={t("Bank Account")}
                value={invoice.accountNumber}
                onChange={(value) => handleChange('accountNumber', value)}
              />
              {/* <EditableSelect
                options={paymentMethods}
                placeholder={t("Payment method")}
                value={invoice.paymentMethod}
                onChange={(value) => handleChange('paymentMethod', value)}
              />*/}
            </View>
            <View className="w-50">
              <EditableInput
                className="bold dark mb-5"
                value={invoice.labels.client}
                onChange={(value) => handleLabelChange('client', value)}
              />
              <CompanySection company={invoice.client}
                              onChange={(value: Company) => handleChange('client', value)}/>
            </View>
          </View>
          <ProductsSection onChange={() => handleChange('products', invoice.products)}/>
          <NotesSection onUpdate={onUpdate}/>
        </Page>
      </Document>
    </PageContext.Provider>
  )
}


export default InvoicePage;
