import format from "date-fns/format";
import {InvoiceInterface} from "./data/types";

const createFormatter = (inv: InvoiceInterface) => {
  return new Intl.NumberFormat(inv.locale, {
    style: 'currency',
    currency: inv.currency,
  });
};

export class Formatter {

  private invoice: InvoiceInterface;
  private formatter: Intl.NumberFormat;

  constructor(invoice: InvoiceInterface) {
    this.invoice = invoice;
    this.formatter = createFormatter(invoice);
  }

  date = (date: Date | [Date, Date] | null) => {
    return date && !Array.isArray(date) ? format(date, this.invoice.dateFormat) : ''
  }

  money = (s: number, withSymbol: boolean = false) => {
    if (withSymbol) {
      return this.formatter.format(s);
    }
    return s.toLocaleString(this.invoice.locale, {minimumFractionDigits: 2});
  }

}
