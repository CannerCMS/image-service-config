import React from 'react';
import {FirebaseClientService} from '../src';
import {Upload, message, Button, Icon, Input, Switch} from 'antd';
import firebase from 'firebase';

export default class ImgurDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      apiKey: "",
      storageBucket: "",
      dir: "",
      hash: false,
      filename: "",
    };
  }

  updateState = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  login = () => {
    const {apiKey, storageBucket} = this.state;
    firebase.initializeApp({
      apiKey,
      storageBucket
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          logined: true
        });
      }
    });
    firebase.auth().signInAnonymously();
  }

  render() {
    const {apiKey, storageBucket, logined, imageUrl, dir, filename, hash} = this.state;
    const imageService = new FirebaseClientService({
      firebase: firebase,
      dir,
      hash,
      filename
    });
    
    const serviceConfig = imageService.getServiceConfig();
    
    const props = {
      onChange: info => {
        if (info.file.status !== 'uploading') {
          // eslint-disable-next-line
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.setState({
            imageUrl: info.file.response.data.link 
          })
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      ...serviceConfig
    };
    return (
      <div>
        <Input placeholder="apiKey" value={apiKey} onChange={e => this.updateState('apiKey', e.target.value)}/>
        <Input placeholder="storageBucket" value={storageBucket} onChange={e => this.updateState('storageBucket', e.target.value)}/>
        <Button onClick={this.login}>Login Firebase</Button>
        {
          logined ?
            <div>
              <Input placeholder="dir" value={dir} onChange={e => this.updateState('dir', e.target.value)}/>
              <Input placeholder="filename" value={filename} onChange={e => this.updateState('filename', e.target.value)}/>
              <Switch placeholder="hash" value={hash} onChange={checked => this.updateState('hash', checked)}/>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload> 
            </div> :
            null
        }
        {imageUrl ? <img src={imageUrl} /> : null}
      </div>
    );
  }
}