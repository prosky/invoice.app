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

  title: string
  companyName: string
  name: string
  companyAddress: string
  companyAddress2: string
  companyCountry: string

  billTo: string
  clientName: string
  clientAddress: string
  clientAddress2: string
  clientCountry: string

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
