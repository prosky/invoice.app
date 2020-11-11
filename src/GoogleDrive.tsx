import React, {Component} from 'react';
// @ts-ignore
import { gapi } from "gapi-script";
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const API_KEY = 'AIzaSyA1eIPh_ZCVZ0WWJXdFioYt5FOD3xkb2Ow';
const CLIENT_ID = '577456712255-k39mpm5tvl8amvfet8e53ebe1vjsjpuo.apps.googleusercontent.com';
const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

interface Props {
  name: string,
  auth: any
}

class GoogleDrive extends Component{
  state = {
    name: '',
  }


  initClient = () => {
    try {
      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': [discoveryUrl]
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
      });
    } catch (e) {
      console.log(e);
    }
  }


  signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
    this.updateSignInStatus()
  }

  signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    this.updateSignInStatus()
  }

  updateSignInStatus = () => {
    this.setSignInStatus();
  }


  setSignInStatus = async () => {
    let user =  gapi.auth2.getAuthInstance().currentUser.get();
    console.log(user)
    if (user.wc == null) {
      this.setState({
        name: ''
      });
    } else {
      let isAuthorized = user.hasGrantedScopes(SCOPE);
      if (isAuthorized) {
        this.setState({
          name: user.Ot.Cd
        });
        const boundary = 'foo_bar_baz'
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        let fileName = 'mychat123';
        let fileData = 'this is a sample data';
        let contentType = 'text/plain'
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

        console.log(multipartRequestBody);
        let request = window.gapi.client.request({
          'path': 'https://www.googleapis.com/upload/drive/v3/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/related; boundary=' + boundary + ''
          },
          'body': multipartRequestBody
        });
        request.execute(function (file) {
          console.log(file)
        });
      }
    }
  }

  handleClientLoad = () => {
    window.gapi.load('client:auth2', this.initClient);
  }


  render() {
    return (
      <div className="GoogleDrive">
        <div>UserName: <strong>{this.state.name}</strong></div>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default GoogleDrive;
