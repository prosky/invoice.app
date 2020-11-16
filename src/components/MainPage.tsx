import React, {Component, ErrorInfo} from 'react'
import {Download as DownloadPDF, Open as OpenPDF} from './DownloadPDF';
import InvoicePage from "./InvoicePage";
import ApplicationContext from "../model/ApplicationContext";
import factory from "../data/initialData";
import {LocalStorage} from "../model/Storage";

import {withTranslation} from "react-i18next";
import SelectSource from "./GoogleDrive/SelectSource";
import {ClearOutlined} from "@ant-design/icons";
import {Select, Space, Switch} from "antd";

import currenciesList from "../data/currencies";
import languagesList from "../data/languagesList";
import Application from "../classes/Application";
import {InvoiceInterface} from "../data/types";
import {debounce} from 'lodash';

const currencies = Object.entries(currenciesList);
const languages = Object.entries(languagesList);
const storage = new LocalStorage();


const initialInvoice = Object.assign(factory.invoice(), storage.load('data') || {});

const app = new Application(initialInvoice);


interface Props {
  invoice: InvoiceInterface
}

window.addEventListener('beforeunload', () => {
  storage.save('data', app.invoice);
  return true;
});

class MainPage extends Component<any, Props> {

  constructor(props: any) {
    super(props);
    this.state = {
      invoice: {...app.invoice}
    };
  }

  save = debounce(() => {
    storage.save('data', app.invoice);
  }, 2000);

  updateState = debounce(() => {
    this.setState({
      invoice: {...app.invoice}
    });
  }, 500);

  onUpdate = () => {
    this.save();
    this.updateState();
  }

  update = (changes: object | undefined = undefined) => {
    Object.assign(app.invoice, changes);
    this.onUpdate();
  }

  reset = () => {
    this.update(factory.invoice());
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('componentDidCatch', error);
    //this.reset();
  };

  render() {
    const {t} = this.props;
    return (
      <ApplicationContext.Provider value={{app: app}}>
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
          <label key={'language'}>
            <Space>
              {t('Language')}
              <Select
                defaultValue={this.state.invoice.locale}
                onChange={(value) => this.update({locale: value})}>
                {languages.map(([key, value]) => <Select.Option key={key} value={key}>{value}</Select.Option>)}
              </Select>
            </Space>
          </label>
          <label key={'currency'}>
            <Space>
              {t('Currency')}
              <Select
                defaultValue={this.state.invoice.currency}
                onChange={(value) => this.update({currency: value})}>
                {currencies.map(([key, value]) => <Select.Option key={key} value={key}>{value}</Select.Option>)}
              </Select>
            </Space>
          </label>
          <Switch checkedChildren={t('With VAT')} unCheckedChildren={t('Without VAT')}
                  onChange={(value) => this.update({withVAT: value})}
                  defaultChecked={this.state.invoice.withVAT}/>
        </Space>

        <InvoicePage pdfMode={false} onUpdate={this.onUpdate}/>
      </ApplicationContext.Provider>)
  }
}

export default withTranslation()(MainPage);
