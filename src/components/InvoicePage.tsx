import React, {FC, useEffect, useState} from 'react'
import {Invoice, ProductLine} from '../data/types'
import {defaultInvoice, initialProductLine} from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import Download from './DownloadPDF'
import format from 'date-fns/format'
import {Font} from "@react-pdf/renderer";
import languagesList from "../data/languagesList";
import {LocalStorage} from "../Storage";

interface Props {
  data?: Invoice
  pdfMode?: boolean
  locale?: string
}

Font.register({
  family: 'Nunito',
  fonts: [
    {src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf'},
    {src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf', fontWeight: 600},
  ],
});

const storage = new LocalStorage();
const CountriesLists: Record<string, Record<string, string>> = {};

const getCountries = async (locale: string): Promise<Record<string, string>> => {
  locale = locale.replace('-', '_');
  if (!CountriesLists[locale]) {
    const data = await import(`../data/countries/${locale}.json`);
    CountriesLists[locale] = data.default;
  }
  return CountriesLists[locale];
};

const InvoicePage: FC<Props> = ({data, pdfMode}) => {

  const initialInvoice = storage.load() || defaultInvoice;
  const [invoice, _setInvoice] = useState<Invoice>(data ? {...data} : {...initialInvoice});
  const [subTotal, setSubTotal] = useState<number>();
  const [saleTax, setSaleTax] = useState<number>();
  const [countryList, setCountryList] = useState<Record<string, string>>({});

  const setInvoice = (data: Invoice) => {
    storage.save(data);
    _setInvoice(data);
  };

  const dateFormat = invoice.dateFormat;

  getCountries(invoice.locale).then((countries: Record<string, string>) => {
    setCountryList(countries);
  });


  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date();
  const invoiceDueDate =
    invoice.invoiceDueDate !== ''
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf());

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30);
  }

  const handleChange = (name: keyof Invoice, value: string) => {
    if (name !== 'productLines') {
      const newInvoice = {...invoice};
      newInvoice[name] = value;
      setInvoice(newInvoice);
    }
  }

  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = {...productLine}

        /*if (name === 'description') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)
            newProductLine[name] = n ? n : 0
          }
        }
*/
        return newProductLine
      }

      return {...productLine}
    })

    setInvoice({...invoice, productLines})
  }

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

    setInvoice({...invoice, productLines})
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, {...initialProductLine}]

    setInvoice({...invoice, productLines})
  }

  const calculateAmount = (data: ProductLine) => {
    const amount = calculatePrice(data) + calculateTax(data);
    return amount.toFixed(2)
  }

  const calculateTax = (data: ProductLine) => {
    const {taxRate, price, quantity} = data;
    return price * taxRate * quantity;
  }

  const calculatePrice = (data: ProductLine) => {
    const {price, quantity} = data;
    return price * quantity;
  }

  const sumPrice = (items: ProductLine[]): number => {
    return items.map(calculatePrice).reduce((a, b) => a + b, 0);
  }
  const sumTax = (items: ProductLine[]): number => {
    return items.map(calculateTax).reduce((a, b) => a + b, 0);
  }

  useEffect(() => {
    setSubTotal(sumPrice(invoice.productLines))
  }, [invoice.productLines])

  useEffect(() => {
    setSaleTax(sumTax(invoice.productLines))
  }, [subTotal, invoice.taxLabel])

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice}/>}
        {!pdfMode &&
        <View className="flex w-50" pdfMode={pdfMode}>
          <label className="bold w-40" htmlFor="">Jazyk</label>
          <EditableSelect
            options={languagesList}
            value={invoice.locale}
            onChange={(value) => handleChange('locale', value)}
            pdfMode={pdfMode}
          />
        </View>}
        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            <EditableInput
              className="fs-20 bold"
              placeholder="Your Company"
              value={invoice.companyName}
              onChange={(value) => handleChange('companyName', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Your Name"
              value={invoice.name}
              onChange={(value) => handleChange('name', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Company's Address"
              value={invoice.companyAddress}
              onChange={(value) => handleChange('companyAddress', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.companyAddress2}
              onChange={(value) => handleChange('companyAddress2', value)}
              pdfMode={pdfMode}
            />
            <EditableSelect
              options={countryList}
              value={invoice.companyCountry}
              onChange={(value) => handleChange('companyCountry', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <EditableInput
              className="fs-45 right bold"
              placeholder="Invoice"
              value={invoice.title}
              onChange={(value) => handleChange('title', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        <View className="flex mt-40" pdfMode={pdfMode}>
          <View className="w-55" pdfMode={pdfMode}>
            <EditableInput
              className="bold dark mb-5"
              value={invoice.billTo}
              onChange={(value) => handleChange('billTo', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Your Client's Name"
              value={invoice.clientName}
              onChange={(value) => handleChange('clientName', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Client's Address"
              value={invoice.clientAddress}
              onChange={(value) => handleChange('clientAddress', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="City, State Zip"
              value={invoice.clientAddress2}
              onChange={(value) => handleChange('clientAddress2', value)}
              pdfMode={pdfMode}
            />
            <EditableSelect
              options={countryList}
              value={invoice.clientCountry}
              onChange={(value) => handleChange('clientCountry', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceTitleLabel}
                  onChange={(value) => handleChange('invoiceTitleLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  placeholder="INV-12"
                  value={invoice.invoiceTitle}
                  onChange={(value) => handleChange('invoiceTitle', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDateLabel}
                  onChange={(value) => handleChange('invoiceDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  dateFormat={dateFormat}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.invoiceDueDateLabel}
                  onChange={(value) => handleChange('invoiceDueDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDueDate, dateFormat)}
                  dateFormat={dateFormat}
                  selected={invoiceDueDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDueDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
          <View className="cell-width-big cell-padding" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={invoice.productLineDescription}
              onChange={(value) => handleChange('productLineDescription', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="cell-width cell-padding" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineQuantity}
              onChange={(value) => handleChange('productLineQuantity', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="cell-width cell-padding" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineTaxRate}
              onChange={(value) => handleChange('productLineTaxRate', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="cell-width cell-padding" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLinePrice}
              onChange={(value) => handleChange('productLinePrice', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="cell-width cell-padding" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={invoice.productLineSum}
              onChange={(value) => handleChange('productLineSum', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        {invoice.productLines.map((productLine, i) => {
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-50 cell-padding pb-10" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark"
                  rows={2}
                  placeholder="Enter item name/description"
                  value={productLine.description}
                  onChange={(value) => handleProductLineChange(i, 'description', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="cell-width cell-padding pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={String(productLine.quantity)}
                  onChange={(value) => handleProductLineChange(i, 'quantity', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="cell-width cell-padding pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={String(productLine.taxRate)}
                  onChange={(value) => handleProductLineChange(i, 'taxRate', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="cell-width cell-padding pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={String(productLine.price)}
                  onChange={(value) => handleProductLineChange(i, 'price', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="cell-width cell-padding pb-10" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine)}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}>
                  <span className="icon icon-remove bg-red"/>
                </button>
              )}
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
            {!pdfMode && (
              <button className="link" onClick={handleAdd}>
                <span className="icon icon-add bg-green mr-10"></span>
                Add Line Item
              </button>
            )}
          </View>
          <View className="w-50 mt-20" pdfMode={pdfMode}>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.subTotalLabel}
                  onChange={(value) => handleChange('subTotalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {subTotal?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.taxLabel}
                  onChange={(value) => handleChange('taxLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {saleTax?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex bg-gray p-5" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={invoice.totalLabel}
                  onChange={(value) => handleChange('totalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5 flex" pdfMode={pdfMode}>
                <EditableInput
                  className="dark bold right ml-30"
                  value={invoice.currency}
                  onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                  {(typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined'
                      ? subTotal + saleTax
                      : 0
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-20" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100"
            value={invoice.notesLabel}
            onChange={(value) => handleChange('notesLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.notes}
            onChange={(value) => handleChange('notes', value)}
            pdfMode={pdfMode}
          />
        </View>
        <View className="mt-20" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100"
            value={invoice.termLabel}
            onChange={(value) => handleChange('termLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.term}
            onChange={(value) => handleChange('term', value)}
            pdfMode={pdfMode}
          />
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePage
