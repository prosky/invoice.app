import React, {FC, useContext, useState} from 'react';
import {Button, Col, Drawer, Row, Space, Spin, Typography} from 'antd';
// @ts-ignore
import {gapi} from 'gapi-script';
import GoogleDriveImage from '../../images/google-drive.svg';
import ListDocuments from './ListDocuments';
import {useTranslation} from "react-i18next";
import {CloudUploadOutlined, LogoutOutlined} from '@ant-design/icons'
import ApplicationContext from "../../model/ApplicationContext";

const {Text} = Typography;
// Client ID and API key from the Developer Console
//const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
//const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
const API_KEY = 'AIzaSyA1eIPh_ZCVZ0WWJXdFioYt5FOD3xkb2Ow';
const CLIENT_ID = '577456712255-k39mpm5tvl8amvfet8e53ebe1vjsjpuo.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';


interface TitleProps {
  onLogout?: () => void;
  signedInUser?: any
}

const Title: FC<TitleProps> = ({signedInUser}) => {
  const {t} = useTranslation();
  return (
    <Row gutter={15} align="middle" wrap={false}>
      <Col>
        <img alt={t('Google Drive Logo')} height="40"
             src={GoogleDriveImage}/>
      </Col>
      <Col>
        {t('Google Drive')}
        {signedInUser &&
        <Text type="secondary">{t('Signed In as:')} {`${signedInUser?.Ad} (${signedInUser?.zu})`}</Text>}
      </Col>
    </Row>
  );
}

interface Props {
  visible: boolean
}

const SelectSource: FC<Props> = ({visible}) => {

  const {app} = useContext(ApplicationContext);
  const [auth, setAuth] = useState(null);

  const [sidebarVisible, setSidebarVisibility] = useState(visible);
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState<object[]>([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  //const handleChange = (file) => {};

  /**
   * Print files.
   */
  const listFiles = (searchTerm: string | null = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        q: searchTerm,
      })
      .then((response: any) => {
        setIsFetchingGoogleDriveFiles(false);
        setListDocumentsVisibility(true);
        setDocuments(response.result.files);
      });
  };

  const downloadFile =  (fileId: string) => {
    return gapi.client.drive.files.get({fileId});
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSignInStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile());
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = () => {
    setListDocumentsVisibility(false);
    gapi.auth2.getAuthInstance().signOut();
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const auth_ = gapi.auth2.getAuthInstance();
        setAuth(auth_);
        // Listen for sign-in state changes.
        auth_.isSignedIn.listen(updateSignInStatus);
        // Handle the initial sign-in state.
        updateSignInStatus(auth_.isSignedIn.get());
      }
    );
  };

  const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  };
  /*
    const showDocuments = () => {
      setListDocumentsVisibility(true);
    };*/

  const upload = async () => {

    const invoice = app.invoice;
    const jsonData = JSON.stringify(app.invoice);

    const boundary = 'foo_bar_baz'
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    let fileName = invoice.title;

    let fileData = jsonData;
    let contentType = 'application/json';
    let metadata = {
      'name': fileName,
      'mimeType': contentType
    };

    let multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n\r\n' +
      fileData + '\r\n' +
      close_delim;

    let request = window.gapi.client.request({
      'path': 'https://www.googleapis.com/upload/drive/v3/files',
      'method': 'POST',
      'params': {'uploadType': 'multipart'},
      'headers': {
        'Content-Type': 'multipart/related; boundary=' + boundary + ''
      },
      'body': multipartRequestBody
    });


    request.execute(() => {
      listFiles();
    });
  }
  const onClose = () => {
    setSidebarVisibility(false);
  };
  const onShow = () => {
    setSidebarVisibility(true);
  };
  const {t} = useTranslation();
  return (
    <>
      <Button className={'mt-10'} type="link" onClick={onShow}>
        <img alt={t('Google Drive Logo')} height="40"
             src={GoogleDriveImage}/>
      </Button>
      <Drawer
        title={<Title signedInUser={signedInUser} onLogout={handleSignOutClick}/>}
        placement="left"
        visible={sidebarVisible}
        closable={true}
        onClose={onClose}
        width={400}>
        {listDocumentsVisible ?
          <ListDocuments
            documents={documents}
            onSearch={listFiles}
            isLoading={isFetchingGoogleDriveFiles}/>
          :
          <Spin spinning={isLoadingGoogleDriveApi} style={{width: '100%'}}>
            <div className="source-container">
              <Button type="primary" onClick={() => handleClientLoad()}>Log in</Button>
            </div>
          </Spin>
        }
        <hr/>
        {signedInUser &&
        <div>
          <div>
            <Button onClick={upload} type="primary" icon={<CloudUploadOutlined/>}>{t('Upload File')}</Button>
          </div>
          <div>
            <Space>
              <Button onClick={handleSignOutClick} type="primary" icon={<LogoutOutlined/>}>
                {t('Log out')}
              </Button>
            </Space>
          </div>
        </div>}
      </Drawer>
    </>


  );
};
export default SelectSource;
