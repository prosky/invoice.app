
import Invoice from "./Invoice";
import {Formatter} from "../formatter";

export default class Application {
  invoice: Invoice;
  formatter: Formatter;

  constructor(invoice: Invoice) {
    this.invoice = invoice;
    this.formatter = new Formatter(invoice);
  }
}
