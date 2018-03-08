import React from 'react';
import {ImgurService} from '../src';
import {Upload, message, Button, Icon, Input, Divider} from 'antd';

export default class ImgurDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      clientId: '',
      mashapeKey: '', 
      imageUrl: ''
    };
  }

  updateState = (field, value) => {
    this.setState({
      [field]: value
    });

  }

  render() {
    const {clientId, mashapeKey, imageUrl} = this.state;
    const imageService = new ImgurService({
      clientId,
      mashapeKey
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
        <Input id="clientId" placeholder="clientId" value={clientId} onChange={e => this.updateState('clientId', e.target.value)}/>
        <Input id="mashapeKey" placeholder="mashapeKey" value={mashapeKey} onChange={e => this.updateState('mashapeKey', e.target.value)}/>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        {imageUrl ? <img src={imageUrl} /> : null}
      </div>
    );
  }
}