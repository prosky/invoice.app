import {CSSProperties} from 'react'

export interface ProductInterface {
  description: string
  quantity: number
  taxRate: number
  price: number
}

export interface CompanyInterface {
  name: string
  address: string
  address2: string
  country: string
  cin: string
  tin: string
}

export interface InvoiceLabels {
  title: string
  date: string
  dueDate: string
  company: string
  client: string

  //ProductLine
  description: string,
  quantity: string,
  price: string,
  taxRate: string,
  sum: string,

  //Summary
  tax: string,
  subTotal: string,
  total: string,

  //Notes
  notes: string,
  terms: string
}

export interface InvoiceInterface {
  labels: InvoiceLabels

  locale: string
  dateFormat: string
  withVAT: boolean

  name: string

  company: CompanyInterface
  accountNumber: string
  paymentMethod: string
  client: CompanyInterface


  title: string
  date: string
  dueDate: string

  products: Array<ProductInterface>

  currency: string
  notes: string
  term: string
}

export interface CSSClasses {
  [key: string]: CSSProperties
}
