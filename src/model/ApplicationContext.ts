import React from "react";
import {Invoice} from "../data/types";
import {defaultInvoice} from "../data/initialData";


interface ApplicationProps{
  invoice: Invoice
}

const ApplicationContext = React.createContext<ApplicationProps>({
  invoice: defaultInvoice
});

export default ApplicationContext;
