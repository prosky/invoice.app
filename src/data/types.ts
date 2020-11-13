import {CSSProperties} from 'react'

export interface ProductLine {
  description: string
  quantity: number
  taxRate: number
  price: number
}

export interface Invoice {
  locale: string,
  dateFormat: string,
  withVAT: boolean,

  title: string
  name: string

  company: {
    name: string
    address: string
    address2: string
    country: string
    cin: string
    tim: string
  }
  billTo: string

  client: {
    name: string
    address: string
    address2: string
    country: string
    cin: string
    tim: string
  }

  invoiceTitleLabel: string
  invoiceTitle: string
  invoiceDateLabel: string
  invoiceDate: string
  invoiceDueDateLabel: string
  invoiceDueDate: string

  productLineDescription: string
  productLineQuantity: string
  productLinePrice: string
  productLineTaxRate: string
  productLineSum: string

  productLines: ProductLine[]

  subTotalLabel: string
  taxLabel: string

  totalLabel: string
  currency: string

  notesLabel: string
  notes: string
  termLabel: string
  term: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
