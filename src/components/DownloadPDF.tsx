import React, {FC, useContext} from 'react';
import ApplicationContext from "../model/ApplicationContext";
import {pdf} from "@react-pdf/renderer";
import {saveAs} from 'file-saver';
import InvoicePage from "./InvoicePage";
import {InvoiceInterface} from "../data/types";


import { ZoomInOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import Invoice from "../classes/Invoice";


const getFileName = (data: InvoiceInterface) => {
  return (data.title || 'invoice').toLowerCase()
}
const getBlob = async (data: Invoice) => {
  const doc = <InvoicePage pdfMode={true} data={data}/>;
  const asPdf = pdf(doc);
  asPdf.updateContainer(doc);
  return await asPdf.toBlob();
}

export const Download: FC = () => {
  const {app} = useContext(ApplicationContext);
  const {invoice: data} =app;
  const download = async () => {
    const blob = await getBlob(data);
    saveAs(blob, getFileName(data));
  };
  return (
    <button className={'btn btn-primary'} title="Download PDF" onClick={download}>
      <CloudDownloadOutlined />
    </button>
  );
}

export const Open: FC = () => {
  const {app} = useContext(ApplicationContext);
  const {invoice: data} =app;
  const open = async () => {
    const blob = await getBlob(data);
    window.open(URL.createObjectURL(blob));
  };
  return (
    <button className={'btn btn-primary'} title="Open PDF" onClick={open}>
      <ZoomInOutlined/>
    </button>
  );
}

