import {Invoice, ProductLine} from './types'
import dateFormats from "./dateFormats";

export const initialProductLine: ProductLine = {
  description: '',
  quantity: 1,
  taxRate: 21,
  price: 0.00,
}

const DEFAULT_LOCALE = 'en-EN';
const defaultLocale = navigator.language || DEFAULT_LOCALE;
const defaultDateFormat = dateFormats[defaultLocale] || dateFormats[DEFAULT_LOCALE];
const defaultCountry = defaultLocale.split('-')[1];

export const defaultInvoice: Invoice = {

  locale: defaultLocale,
  dateFormat: defaultDateFormat,
  withVAT: false,

  title: 'INVOICE',
  name: '',

  company:{
    name: '',
    address: '',
    address2: '',
    country: defaultCountry,
  },

  billTo: 'Bill To:',

  client:{
    name: '',
    address: '',
    address2: '',
    country: defaultCountry,
  },

  invoiceTitleLabel: 'Invoice#',
  invoiceTitle: '',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '',
  productLineDescription: 'Item Description',
  productLineQuantity: 'Quantity',
  productLinePrice: 'Price',
  productLineTaxRate: 'Tax Rate',
  productLineSum: 'Sum',
  productLines: [
    {...initialProductLine},
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax',
  totalLabel: 'TOTAL',
  currency: 'CZK',
  notesLabel: '',// 'Notes',
  notes: '',//'It was great doing business with you.',
  termLabel: '',//'Terms & Conditions',
  term: '',//'Please make the payment by the due date.',
}
