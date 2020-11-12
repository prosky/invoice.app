import React, { ReactElement, useEffect, useState } from "react";

// @ts-ignore
import { gapi } from "gapi-script";
import { config } from "dotenv";

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
      client_id: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(() => {
      // Listen for sign-in state changes.
      console.log("gapi.auth2", gapi.auth2);

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

function LogInOutButton(options: {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}): ReactElement {
  const { loggedIn, logIn, logOut } = options;
  const buttonText = loggedIn ? "Log out" : "Log in";
  const buttonAction = loggedIn ? logOut : logIn;

  return <button onClick={buttonAction}>{buttonText}</button>;
}

export function GDrive(): ReactElement {
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);
  const [initiatedClient, setInitiatedClient] = useState<boolean>(false);

  useEffect(() => {
    gapi.load("client:auth2", () =>
      initClient({
        updateLoggedInStatus: (status) => {
          console.log("Login status", status);
          setLoggedInStatus(status);
        },
      })
    );

    setInitiatedClient(true);
  }, [initiatedClient]);

  return (
    <div>
      <div>You are {loggedInStatus ? "" : "not"} signed in</div>
      <LogInOutButton
        loggedIn={loggedInStatus}
        logIn={() => gapi.auth2.getAuthInstance().signIn()}
        logOut={() => gapi.auth2.getAuthInstance().signOut()}
      />
    </div>
  );
}

export default GDrive;
