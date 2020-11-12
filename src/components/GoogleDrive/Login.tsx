import React, {ReactElement, useEffect, useState} from "react";
import List from "./List";
// @ts-ignore
import {gapi} from "gapi-script";
import {config} from "dotenv";
import {useTranslation} from "react-i18next";
import GoogleDriveLogo from '../../images/google-drive.svg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

config(); // I just don't like mixing import and require

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const API_KEY = 'AIzaSyA1eIPh_ZCVZ0WWJXdFioYt5FOD3xkb2Ow';
const CLIENT_ID = '577456712255-k39mpm5tvl8amvfet8e53ebe1vjsjpuo.apps.googleusercontent.com';

let done = false;

const initClient = (options: {
  updateLoggedInStatus: (status: boolean) => void;
}) => {
  if (done) {
    return;
  }
  done = true;
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(() => {
      // Listen for sign-in state changes.
      gapi.auth2
        .getAuthInstance()
        .isSignedIn.listen(options.updateLoggedInStatus);

      // Handle the initial sign-in state.
      options.updateLoggedInStatus(
        gapi.auth2.getAuthInstance().isSignedIn.get()
      );
    })
    .catch((err: any) => {
      console.error("Caught error", err);
    });
};

function Login(): ReactElement {

  const {t} = useTranslation();

  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);
  const [initiatedClient, setInitiatedClient] = useState<boolean>(false);

  useEffect(() => {
    gapi.load("client:auth2", () =>
      initClient({
        updateLoggedInStatus: (status) => {
          setLoggedInStatus(status);
        },
      })
    );
    setInitiatedClient(true);
  }, [initiatedClient]);

  const getProfile = () => {
    let profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    return (<>
      <div>{profile.getName()}</div>
      <div>{profile.getEmail()}</div>
    </>);
  }

  return (
    <div className={'google-drive-tab'}>
      <div className={'google-login'}>
        <div className={'flex align-items-center'}>
          <div className={'mr-10'}>
            <img width={'40px'} className={'img-fluid block'} src={GoogleDriveLogo} alt="Google Drive Logo"/>
          </div>
          {loggedInStatus ?
            <>
              <div className={'mr-10'}>{getProfile()}</div>
              <button className={'btn btn-primary'} onClick={() => gapi.auth2.getAuthInstance().signOut()}
                      title={t('Log out')}>
                <FontAwesomeIcon icon={faSignOutAlt} size={'2x'}/>
              </button>
            </>
            :
            <button className={'btn btn-primary'} onClick={() => gapi.auth2.getAuthInstance().signIn()}
                    title={t('Log in')}>{t('Log in')}
            </button>
          }
        </div>
      </div>
      <List/>
    </div>
  );
}

export default Login;
