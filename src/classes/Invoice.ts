import {InvoiceInterface, InvoiceLabels, ProductInterface} from "../data/types";
import factory from "../data/initialData";
import Company from "./Company";

const defaultLabels: InvoiceLabels = {
  title: 'Invoice#',
  date: 'Invoice Date',
  dueDate: 'Due Date',
  company: 'Company:',//Dodavatel
  client: 'Client:',//Odběratel

  description: 'Item Description',
  quantity: 'Quantity',
  price: 'Price',
  taxRate: 'Tax Rate',
  sum: 'Sum',
  tax: 'Sale Tax',
  subTotal: 'Sub Total',
  total: 'TOTAL',
  notes: '',
  terms: ''
};


export default class Invoice implements InvoiceInterface {


  labels = defaultLabels;

  locale = '';
  dateFormat: string;
  withVAT = false;
  title = 'INVOICE';
  name = '';
  accountNumber = '';

  date = '';
  dueDate = '';
  products = [factory.product()];

  company: Company;
  client: Company;

  currency;
  notes = '';//'It was great doing business with you.',
  term = '';//'Please make the payment by the due date.',

  paymentMethod = '';

  constructor(country: string, currency: string, locale: string, dateformat: string) {
    this.locale = locale;
    this.currency = currency;
    this.dateFormat = dateformat;
    this.company = new Company(country);
    this.client = new Company(country);
  }

  calculateTax = (data: ProductInterface): number => {
    const {taxRate, price, quantity} = data;
    if (this.withVAT) {
      return price * (taxRate / 100) * quantity;
    }
    return 0;
  }

  calculatePrice = (data: ProductInterface): number => {
    const {price, quantity} = data;
    return price * quantity;
  }

  sumPrice = (): number => {
    return this.products.map(this.calculatePrice).reduce((a, b) => a + b, 0);
  }

  sumTax = (): number => {
    return this.products.map(this.calculateTax).reduce((a, b) => a + b, 0);
  }


}
