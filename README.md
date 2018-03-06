# Image Service Config
> the image service configuration of Canner CMS

## Installation

```
yarn add @canner/image-service-config
npm i --save @canner/image-service-config
```

## Usage

**webpack**
```js
plugins: [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // for imgur
    'process.env.IMGUR_MASHAPE_KEY': JSON.stringify(YOUR_IMGUR_MASHAPE_KEY)
  })
]
```

```js
import createImageService from '@canner/image-service-config';
import {Upload, message, Button, Icon} from 'antd';

const serviceConfig = createImageService({
  service,
  dir
}, {key}).getServiceConfig();

const props = {
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  ...serviceConfig  
};

ReactDOM.render(
  <Upload {...props}>
    <Button>
      <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>
, mountNode);
```