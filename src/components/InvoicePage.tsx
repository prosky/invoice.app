import React, {FC, useContext, useEffect, useState} from 'react'
import {Invoice, ProductLine} from '../data/types'
import {initialProductLine} from '../data/initialData'
import EditableInput from './Inputs/EditableInput'
import EditableSelect from './Inputs/EditableSelect'
import EditableTextarea from './Inputs/EditableTextarea'
import EditableCalendarInput from './Inputs/EditableCalendarInput'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import format from 'date-fns/format'
import {Font} from "@react-pdf/renderer";
import PageContext from "../model/PageContext";
import ApplicationContext from "../model/ApplicationContext";
import {useTranslation} from 'react-i18next';
import countries from '../data/countries';


interface Props {
  pdfMode: boolean
  locale?: string
  data?: Invoice
  onUpdate?: Function
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

const createFormatter = (inv: Invoice) => {
  console.log(inv.locale, inv.currency);
  return new Intl.NumberFormat(inv.locale, {
    style: 'currency',
    currency: inv.currency,
  });
};

type Handler = <T>(item: T, key: keyof T, value: any) => void;

const InvoicePage: FC<Props> = ({pdfMode, onUpdate, data}) => {

  const {invoice: contextData} = useContext(ApplicationContext);

  const invoice = data || contextData;

  const [formatter, setFormatter] = useState<Intl.NumberFormat>();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [saleTax, setSaleTax] = useState<number>(0);

  const dateFormat = invoice.dateFormat;

  const sumPrice = (items: ProductLine[]): number => {
    return items.map(calculatePrice).reduce((a, b) => a + b, 0);
  }
  const sumTax = (items: ProductLine[]): number => {
    return items.map(calculateTax).reduce((a, b) => a + b, 0);
  }

  const update = (changes: object) => {
    onUpdate && onUpdate(changes);
    setSubTotal(sumPrice(invoice.productLines));
    setSaleTax(sumTax(invoice.productLines));
  }

  const invoiceDate = createDate(invoice.invoiceDate);

  const invoiceDueDate = createDate(invoice.invoiceDueDate, invoiceDate);

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }
  const handleChange = (item: Handler, name: keyof Handler, value: string) => {
    if (name !== 'productLines') {
      update({
        [name]: value
      });
    }
  }

  const handleProductLineChange = (productLine: ProductLine, name: keyof ProductLine, value: string) => {
    // @ts-ignore
    productLine[name] = value;
    update({
      productLines: invoice.productLines
    });
  }

  const handleRemove = (i: number) => {
    invoice.productLines = invoice.productLines.filter((productLine, index) => index !== i);
    update({
      productLines: invoice.productLines
    });
  }

  const handleAdd = () => {
    invoice.productLines.push({...initialProductLine});
    update({
      productLines: invoice.productLines
    });
  }

  const calculateAmount = (data: ProductLine): number => {
    return calculatePrice(data) + calculateTax(data);
  }

  const calculateTax = (data: ProductLine) => {
    const {taxRate, price, quantity} = data;
    if (invoice.withVAT) {
      return price * (taxRate / 100) * quantity;
    }
    return 0;
  }

  const calculatePrice = (data: ProductLine) => {
    const {price, quantity} = data;
    return price * quantity;
  }

  const formatDate = (date: Date | [Date, Date] | null) => {
    return date && !Array.isArray(date) ? format(date, invoice.dateFormat) : ''
  }
  const {t} = useTranslation();

  formatter || setFormatter(createFormatter(invoice));
  useEffect(() => {
    setFormatter(createFormatter(invoice));
  }, [invoice.locale, invoice.currency])

  const money = (s: number, withSymbol: boolean = false) => {
    if (withSymbol) {
      return formatter?.format(s);
    }
    return s.toLocaleString(invoice.locale, {minimumFractionDigits: 2});
  }

  return (
    <PageContext.Provider value={{pdfMode}}>
      <Document>
        <Page className="invoice-wrapper">
          <View className="flex">
            <View className="w-50">
              <EditableInput
                className="fs-20 bold"
                placeholder={t("Your Company")}
                value={invoice.company.name}
                onChange={(value) => handleChange('companyName', value)}
              />
              <EditableInput
                placeholder={t("Your Name")}
                value={invoice.name}
                onChange={(value) => handleChange('name', value)}
              />
              <EditableInput
                placeholder={t("Company's Address")}
                value={invoice.company.address}
                onChange={(value) => handleChange(invoice.company, 'address', value)}
              />
              <EditableInput
                placeholder={t("City, State Zip")}
                value={invoice.company.address2}
                onChange={(value) => handleChange('company.address2', value)}
              />
              <EditableSelect
                placeholder={t("Company's Country")}
                options={countries}
                value={invoice.company.country}
                onChange={(value) => handleChange('country', value)}
              />
              <EditableInput
                placeholder={t("Company Identification Number")}
                value={invoice.company.cin}
                onChange={(value) => handleChange('cin', value)}
              />
              <EditableInput
                placeholder={t("Tax Identification Number")}
                value={invoice.company.tin}
                onChange={(value) => handleChange('tin', value)}
              />
              <EditableInput
                placeholder={t("Bank Account")}
                value={invoice.company.accountNumber}
                onChange={(value) => handleChange(invoice.company, 'accountNumber', value)}
              />
            </View>
            <View className="w-50">
              <EditableInput
                className="fs-45 right bold"
                placeholder={t("Invoice")}
                value={invoice.title}
                onChange={(value) => handleChange('title', value)}
              />
            </View>
          </View>
          <View className="flex mt-40">
            <View className="w-55">
              <EditableInput
                className="bold dark mb-5"
                value={invoice.billTo}
                onChange={(value) => handleChange('billTo', value)}
              />
              <EditableInput
                placeholder={t("Your Client's Name")}
                value={invoice.clientName}
                onChange={(value) => handleChange('clientName', value)}
              />
              <EditableInput
                placeholder={t("Client's Address")}
                value={invoice.clientAddress}
                onChange={(value) => handleChange('clientAddress', value)}
              />
              <EditableInput
                placeholder={t("City, State Zip")}
                value={invoice.clientAddress2}
                onChange={(value) => handleChange('clientAddress2', value)}
              />
              <EditableSelect
                options={countries}
                placeholder={t("Client's Country")}
                value={invoice.clientCountry}
                onChange={(value) => handleChange('clientCountry', value)}
              />
            </View>
            <View className="w-45">
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.invoiceTitleLabel}
                    onChange={(value) => handleChange('invoiceTitleLabel', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableInput
                    placeholder={t("INV-12")}
                    value={invoice.invoiceTitle}
                    onChange={(value) => handleChange('invoiceTitle', value)}
                  />
                </View>
              </View>
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.invoiceDateLabel}
                    onChange={(value) => handleChange('invoiceDateLabel', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableCalendarInput
                    value={formatDate(invoiceDate)}
                    dateFormat={dateFormat}
                    selected={invoiceDate}
                    onChange={(date) => handleChange('invoiceDate', formatDate(date))}
                  />
                </View>
              </View>
              <View className="flex mb-5">
                <View className="w-40">
                  <EditableInput
                    className="bold"
                    value={invoice.invoiceDueDateLabel}
                    onChange={(value) => handleChange('invoiceDueDateLabel', value)}
                  />
                </View>
                <View className="w-60">
                  <EditableCalendarInput
                    value={formatDate(invoiceDueDate)}
                    dateFormat={dateFormat}
                    selected={invoiceDueDate}
                    onChange={(date) => handleChange('invoiceDueDate', formatDate(date))}
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="mt-30 bg-dark flex">
            <View className="cell-width-big cell-padding">
              <EditableInput
                className="white bold"
                value={invoice.productLineDescription}
                onChange={(value) => handleChange('productLineDescription', value)}
              />
            </View>
            <View className="cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.productLineQuantity}
                onChange={(value) => handleChange('productLineQuantity', value)}
              />
            </View>
            {invoice.withVAT && <View className="cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.productLineTaxRate}
                onChange={(value) => handleChange('productLineTaxRate', value)}
              />
            </View>}

            <View className="cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.productLinePrice}
                onChange={(value) => handleChange('productLinePrice', value)}
              />
            </View>
            <View className="cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.productLineSum}
                onChange={(value) => handleChange('productLineSum', value)}
              />
            </View>
          </View>

          {invoice.productLines.map((productLine, i) => (
            <View key={i} className="row flex">
              <View className="cell-width-big cell-padding pb-10">
                <EditableTextarea
                  className="dark"
                  rows={2}
                  placeholder={t("Enter item name/description")}
                  value={productLine.description}
                  onChange={(value) => handleProductLineChange(productLine, 'description', value)}
                />
              </View>
              <View className="cell-width cell-padding pb-10">
                <EditableInput
                  className="dark right"
                  value={productLine.quantity}
                  onChange={(value) => handleProductLineChange(productLine, 'quantity', value)}
                />
              </View>
              {invoice.withVAT &&
              <View className="cell-width cell-padding pb-10">
                <EditableInput
                  className="dark right"
                  value={productLine.taxRate}
                  onChange={(value) => handleProductLineChange(productLine, 'taxRate', value)}
                />
              </View>}
              <View className="cell-width cell-padding pb-10">
                <EditableInput
                  className="dark right"
                  value={productLine.price}
                  onChange={(value) => handleProductLineChange(productLine, 'price', value)}
                />
              </View>
              <View className="cell-width cell-padding pb-10">
                <Text className="dark right">
                  {money(calculateAmount(productLine))}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label={t("Remove Row")}
                  title={t("Remove Row")}
                  onClick={() => handleRemove(i)}>
                  <span className="icon icon-remove bg-red"/>
                </button>
              )}
            </View>
          ))}
          <View className="flex">
            <View className="w-50 mt-10">
              {!pdfMode && (
                <button className="link" onClick={handleAdd}>
                  <span className="icon icon-add bg-green mr-10"/>
                  {t('Add Line Item')}
                </button>
              )}
            </View>
            <View className="w-50 mt-20">
              <View className="flex">
                <View className="w-50 p-5">
                  <EditableInput
                    value={invoice.subTotalLabel}
                    onChange={(value) => handleChange('subTotalLabel', value)}
                  />
                </View>
                <View className="w-50 p-5">
                  <Text className="right bold dark">
                    {money(subTotal)}
                  </Text>
                </View>
              </View>
              <View className="flex">
                <View className="w-50 p-5">
                  <EditableInput
                    value={invoice.taxLabel}
                    onChange={(value) => handleChange('taxLabel', value)}
                  />
                </View>
                <View className="w-50 p-5">
                  <Text className="right bold dark">
                    {money(saleTax)}
                  </Text>
                </View>
              </View>
              <View className="flex bg-gray p-5">
                <View className="w-50 p-5">
                  <EditableInput
                    className="bold"
                    value={invoice.totalLabel}
                    onChange={(value) => handleChange('totalLabel', value)}
                  />
                </View>
                <View className="w-50 p-5 flex">
                  <Text className="right bold dark">
                    {money((subTotal + saleTax), true)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-20">
            <EditableInput
              className="bold w-100"
              placeholder={t('Notes')}
              value={invoice.notesLabel}
              onChange={(value) => handleChange('notesLabel', value)}
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
              value={invoice.termLabel}
              onChange={(value) => handleChange('termLabel', value)}
            />
            <EditableTextarea
              className="w-100"
              placeholder={t('Please make the payment by the due date.')}
              rows={2}
              value={invoice.term}
              onChange={(value) => handleChange('term', value)}
            />
          </View>
        </Page>
      </Document>
    </PageContext.Provider>
  )
}


export default InvoicePage;
