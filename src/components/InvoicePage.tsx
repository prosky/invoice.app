import React, {FC, useContext, useState} from 'react'
import {Invoice, ProductLine} from '../data/types'
import {initialProductLine} from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import format from 'date-fns/format'
import {Font} from "@react-pdf/renderer";
import languagesList from "../data/languagesList";
import PageContext from "../PageContext";
import ApplicationContext from "../ApplicationContext";
import {useTranslation} from 'react-i18next';

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

const CountriesLists: Record<string, Record<string, string>> = {};


const getCountries = async (locale: string): Promise<Record<string, string>> => {
  locale = locale.replace('-', '_');
  if (!CountriesLists[locale]) {
    const data = await import(`../data/countries/${locale}.json`);
    CountriesLists[locale] = data.default;
  }
  return CountriesLists[locale];
};

const createDate = (val: string, defaultDate: Date = new Date()): Date => {
  return val ? new Date(val) : new Date(defaultDate);
};

const InvoicePage: FC<Props> = ({pdfMode, onUpdate, data}) => {

  const {invoice: contextData} = useContext(ApplicationContext);

  const invoice = data || contextData;

  const [subTotal, setSubTotal] = useState<number>(0);
  const [saleTax, setSaleTax] = useState<number>(0);
  const [countryList, setCountryList] = useState<Record<string, string>>({});

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

  getCountries(invoice.locale).then((countries: Record<string, string>) => {
    setCountryList(countries);
  });

  const invoiceDate = createDate(invoice.invoiceDate);

  const invoiceDueDate = createDate(invoice.invoiceDueDate, invoiceDate);

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  const handleChange = (name: keyof Invoice, value: string) => {
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

  const calculateAmount = (data: ProductLine) => {
    const amount = calculatePrice(data) + calculateTax(data);
    return amount.toFixed(2);
  }

  const calculateTax = (data: ProductLine) => {
    const {taxRate, price, quantity} = data;
    return price * (taxRate / 100) * quantity;
  }

  const calculatePrice = (data: ProductLine) => {
    const {price, quantity} = data;
    return price * quantity;
  }

  const formatDate = (date: Date | [Date, Date] | null) => {
    return date && !Array.isArray(date) ? format(date, invoice.dateFormat) : ''
  }

  const {t, i18n} = useTranslation();

  return (
    <PageContext.Provider value={{pdfMode}}>
      <Document>
        <Page className="invoice-wrapper">
          {!pdfMode &&
          <View className="flex w-50">
            <label className="bold w-40" htmlFor="">Jazyk</label>
            <EditableSelect
              options={languagesList}
              value={invoice.locale}
              onChange={(value) => handleChange('locale', value)}
            />
          </View>}

          <View className="flex">
            <View className="w-50">
              <EditableInput
                className="fs-20 bold"
                placeholder={t("Your Company")}
                value={invoice.companyName}
                onChange={(value) => handleChange('companyName', value)}
              />
              <EditableInput
                placeholder={t("Your Name")}
                value={invoice.name}
                onChange={(value) => handleChange('name', value)}

              />
              <EditableInput
                placeholder={t("Company's Address")}
                value={invoice.companyAddress}
                onChange={(value) => handleChange('companyAddress', value)}
              />
              <EditableInput
                placeholder={t("City, State Zip")}
                value={invoice.companyAddress2}
                onChange={(value) => handleChange('companyAddress2', value)}
              />
              <EditableSelect
                options={countryList}
                value={invoice.companyCountry}
                onChange={(value) => handleChange('companyCountry', value)}
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
                options={countryList}
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
            <View className="cell-width cell-padding">
              <EditableInput
                className="white bold right"
                value={invoice.productLineTaxRate}
                onChange={(value) => handleChange('productLineTaxRate', value)}
              />
            </View>
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
              <View className="cell-width cell-padding pb-10">
                <EditableInput
                  className="dark right"
                  value={productLine.taxRate}
                  onChange={(value) => handleProductLineChange(productLine, 'taxRate', value)}
                />
              </View>
              <View className="cell-width cell-padding pb-10">
                <EditableInput
                  className="dark right"
                  value={productLine.price}
                  onChange={(value) => handleProductLineChange(productLine, 'price', value)}
                />
              </View>
              <View className="cell-width cell-padding pb-10">
                <Text className="dark right">
                  {calculateAmount(productLine)}
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
                    {subTotal?.toFixed(2)}
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
                    {saleTax?.toFixed(2)}
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
                  <EditableInput
                    className="dark bold right ml-30"
                    value={invoice.currency}
                    onChange={(value) => handleChange('currency', value)}
                  />
                  <Text className="right bold dark w-auto">
                    {(subTotal + saleTax).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="mt-20">
            <EditableInput
              className="bold w-100"
              value={invoice.notesLabel}
              onChange={(value) => handleChange('notesLabel', value)}
            />
            <EditableTextarea
              className="w-100"
              rows={2}
              value={invoice.notes}
              onChange={(value) => handleChange('notes', value)}
            />
          </View>
          <View className="mt-20">
            <EditableInput
              className="bold w-100"
              value={invoice.termLabel}
              onChange={(value) => handleChange('termLabel', value)}
            />
            <EditableTextarea
              className="w-100"
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
