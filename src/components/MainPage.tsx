import React, {Component} from 'react'
import {Download as DownloadPDF, Open as OpenPDF} from './DownloadPDF';
import InvoicePage from "./InvoicePage";
import ApplicationContext from "../ApplicationContext";
import {defaultInvoice} from "../data/initialData";
import {LocalStorage} from "../Storage";
import {Invoice} from "../data/types";

import RefreshIcon from '@material-ui/icons/Refresh';
import { withTranslation} from "react-i18next";

const storage = new LocalStorage();

const initialInvoice = storage.load() || defaultInvoice;

interface Props {
  invoice: Invoice
}

class MainPage extends Component<any, Props> {

  constructor(props: any) {
    super(props);
    this.state = {
      invoice: initialInvoice
    };
  }

  onUpdate = (changes: Invoice) => {
    let newData = {...this.state.invoice, ...changes};
    this.setState({
      invoice: newData
    });
    storage.save(newData);
  }

  reset = () => {
    this.onUpdate({...defaultInvoice});
  }

  render() {
    const { t } = this.props;
    return (
      <ApplicationContext.Provider value={{invoice: this.state.invoice}}>
        <h1 className="center primary fs-30">{t('React Invoice Generator')}</h1>
        <div className={'fixed-nav'}>
          <div className={'p-5'}>
            <DownloadPDF/>
          </div>
          <div className={'p-5'}>
            <OpenPDF/>
          </div>
          <div className={'p-5'}>
            <button className={'btn btn-primary'}  title={t("Reset")}
                    onClick={this.reset}>
              <RefreshIcon />
            </button>
          </div>
        </div>

        <InvoicePage pdfMode={false} onUpdate={this.onUpdate}/>
      </ApplicationContext.Provider>);
  }
}

export default withTranslation()(MainPage);
