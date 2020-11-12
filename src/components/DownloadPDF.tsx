import React, {FC, useContext} from 'react';
import ApplicationContext from "../model/ApplicationContext";
import {pdf} from "@react-pdf/renderer";
import {saveAs} from 'file-saver';
import InvoicePage from "./InvoicePage";
import {Invoice} from "../data/types";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloudDownloadAlt, faBookOpen} from '@fortawesome/free-solid-svg-icons';
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

const getFileName = (data: Invoice) => {
  return (data.invoiceTitle || 'invoice').toLowerCase()
}
const getBlob = async (data: Invoice) => {
  const doc = <InvoicePage pdfMode={true} data={data}/>;
  const asPdf = pdf(doc);
  asPdf.updateContainer(doc);
  return await asPdf.toBlob();
}

export const Download: FC = () => {
  const {invoice: data} = useContext(ApplicationContext);
  const download = async () => {
    const blob = await getBlob(data);
    saveAs(blob, getFileName(data));
  };
  return (
    <button className={'btn btn-primary'} title="Download PDF" onClick={download}>
      <FontAwesomeIcon icon={faCloudDownloadAlt}  size={'4x'}/>
    </button>
  );
}

export const Open: FC = () => {
  const {invoice: data} = useContext(ApplicationContext);
  const open = async () => {
    const blob = await getBlob(data);
    window.open(URL.createObjectURL(blob));
  };
  return (
    <button className={'btn btn-primary'} title="Open PDF" onClick={open}>
      <FontAwesomeIcon icon={faExternalLinkAlt} size={'4x'}/>
    </button>
  );
}

