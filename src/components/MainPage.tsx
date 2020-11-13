import React, {Component, ErrorInfo} from 'react'
import {Download as DownloadPDF, Open as OpenPDF} from './DownloadPDF';
import InvoicePage from "./InvoicePage";
import ApplicationContext from "../model/ApplicationContext";
import {defaultInvoice} from "../data/initialData";
import {LocalStorage} from "../model/Storage";
import {Invoice} from "../data/types";

import {withTranslation} from "react-i18next";
import SelectSource from "./GoogleDrive/SelectSource";
import {ClearOutlined} from "@ant-design/icons";
import {Select, Space, Switch} from "antd";

import currenciesList from "../data/currencies";
import languagesList from "../data/languagesList";

const currencies = Object.entries(currenciesList);
const languages = Object.entries(languagesList);
const storage = new LocalStorage();

const initialInvoice = storage.load('data') || defaultInvoice;

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

  onUpdate = (changes: any) => {
    let newData = {...this.state.invoice, ...changes};
    this.setState({
      invoice: newData
    });
    storage.save('data', newData);
  }

  reset = () => {
    this.onUpdate({...defaultInvoice});
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
    this.reset();
  };


  render() {
    const {t} = this.props;
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
            <button className={'btn btn-danger'} title={t("Reset")} onClick={this.reset}>
              <ClearOutlined/>
            </button>
          </div>
        </div>
        <aside id="side-nav" className={'side-nav'}>
          <SelectSource visible={false}/>
        </aside>

        <Space>
          <label>
            <Space>
              {t('Language')}
              <Select
                defaultValue={this.state.invoice.locale}
                onChange={(value) => this.onUpdate({locale: value})}>
                {languages.map(([key, value]) => <Select.Option value={key}>{value}</Select.Option>)}
              </Select>
            </Space>
          </label>
          <label>
            <Space>
              {t('Currency')}
              <Select
                defaultValue={this.state.invoice.currency}
                onChange={(value) => this.onUpdate({currency: value})}>
                {currencies.map(([key, value]) => <Select.Option value={key}>{value}</Select.Option>)}
              </Select>
            </Space>
          </label>
          <Switch checkedChildren={t('With VAT')} unCheckedChildren={t('Without VAT')}
                  onChange={(value)=>this.onUpdate({withVAT: value})}
                  defaultChecked={this.state.invoice.withVAT}/>
        </Space>

        <InvoicePage pdfMode={false} onUpdate={this.onUpdate}/>
      </ApplicationContext.Provider>)
  }
}

export default withTranslation()(MainPage);
