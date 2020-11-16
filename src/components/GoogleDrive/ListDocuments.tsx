import React, {FC, useCallback, useContext} from 'react';
import moment from 'moment';
import {debounce} from 'lodash';

import {Button, Col, Input, Row, Table, Tooltip} from 'antd';
import {useTranslation} from "react-i18next";
import ApplicationContext from "../../model/ApplicationContext";

const {Search} = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'modifiedTime',
    key: 'modifiedTime',
    render: (text: string) => <span>{moment(text).format('Do MMM YYYY HH:mm A')}</span>,
  },
  {
    title: 'Action',
    key: 'status',
    dataIndex: 'status',
    render: (params: any) => (
      <span>
        <ShowButton {...params}/>
      </span>
    ),
  },
];

const ShowButton: FC = (params) => {
  console.log(params);
  const {app} = useContext(ApplicationContext);
  const {t} = useTranslation();
  const onClick = () => {

  }
  return (
    <Tooltip title={t('View Document')}>
      <Button type="primary" ghost onClick={onClick}>
        {t('Select')}
      </Button>
    </Tooltip>
  );
}

interface Params {
  documents: object[];
  onSearch: (q: string | null) => void;
  isLoading: boolean;
}


const ListDocuments: FC<Params> = ({documents = [], onSearch, isLoading}) => {
  const search = (value: string) => {
    delayedQuery(`name contains '${value}'`);
  };

  const delayedQuery = useCallback(
    debounce((q) => onSearch(q), 500),
    []
  );

  const {t} = useTranslation();
  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="table-card-actions-container">
          <div className="table-search-container">
            <Search
              placeholder="Search Google Drive"
              onChange={(e) => search(e.target.value)}
              onSearch={(value) => search(value)}
              className="table-search-input"
              enterButton
            />
          </div>
        </div>
        <Table
          className="table-striped-rows"
          columns={columns}
          dataSource={documents}
          pagination={{simple: true}}
          loading={isLoading}
        />
      </Col>
    </Row>
  );
};

export default ListDocuments;
