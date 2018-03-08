# image-service-config
> Configuration for image services using antd uploader: https://ant.design/components/upload/

Support platforms:

- [Imgur](#imgurservice)
- [Firebase client JS SDK](#firebaseclientservice)
- [Firebase admin](##firebaseadminservice)

## Installation

```
yarn add @canner/image-service-config

npm i --save @canner/image-service-config
```

## Usage

```js
const serviceConfig = imageService.getServiceConfig();

class MyUpload extends React.Component {
  render() {
    return (
      <Upload {...serviceConfig}>  // just pass `serviceConfig` to props, then your done!
        <Button>
          <Icon type="upload" /> upload
        </Button>
      </Upload>
    );
  }
}
```

## Support

### ImgurService (Imgur)

Imgur API support.

#### args
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  <tr>
    <td>clientId</td>
    <td>string</td>
    <td>''</td>
    <td>(required) Your Imgur's clientId, Docs: https://apidocs.imgur.com/</td>
  </tr>
  <tr>
    <td>mashapeKey</td>
    <td>string</td>
    <td>''</td>
    <td>(optional) Your mashape's imgur key, Docs: https://market.mashape.com/imgur/imgur-9#image-upload </td>
  </tr>
</table>

#### methods
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>description</th>
  </tr>
  <tr>
    <td>getServiceConfig</td>
    <th><code>() => {name: "image", accept: "image/*", action: string, headers: Object}</code></th>
    <td>return the uploading configuration for imgur</td>
  </tr>
</table>

```js
import {ImgurService} from '@canner/image-service-config';

const imageService = new ImgurService({
  clientId, // https://apidocs.imgur.com/
  mashapeKey // https://market.mashape.com/imgur/imgur-9#image-upload
});

const serviceConfig = imageService.getServiceConfig();
console.log(serviceConfig);
// {
//   name: "image",
//   accept: "image/*",
//   action: "https://api.imgur.com/3/image",
//   headers: {
//     Authorization: `Client-ID <YOUR CLIENTID>`,
//     "X-Requested-With": null 
//    }
// }
```

### FirebaseClientService (Firebase JS SDK)

Firebase client SDK support.

#### args
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  <tr>
    <td>firebase</td>
    <td>Firebase</td>
    <td>''</td>
    <td>(required) A authenticated Firebase instance to upload image to firebase storage </td>
  </tr>
  <tr>
    <td>filename</td>
    <td>string</td>
    <td>''</td>
    <td>(optional) filename without extension</td>
  </tr>
  <tr>
    <td>dir</td>
    <td>string</td>
    <td>''</td>
    <td>(optional) directory name,  eg: `path/to/you/want`  </td>
  </tr>
  <tr>
    <td>hash</td>
    <td>boolean</td>
    <td>false</td>
    <td>(optional) if true, filename will add a postfix hash, e.g.: filename-&lt;hash&gt;.png</td>
  </tr>
</table>

#### methods
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>description</th>
  </tr>
  <tr>
    <td>getServiceConfig</td>
    <th><code>() => {customRequest: Function}</code>. See https://github.com/react-component/upload#customrequest</th>
    <td>return the uploading configurations for firebase client sdk </td>
  </tr>
  <tr>
    <td>setHash</td>
    <th><code>boolean => ImageService</code></th>
    <td>set the hash</td>
  </tr>
  <tr>
    <td>setDir</td>
    <th><code>string => ImageService</code></th>
    <td>set the dir</td>
  </tr>
  <tr>
    <td>setFilename</td>
    <th><code>string => ImageService</code></th>
    <td>set the filename</td>
  </tr>
</table>

```js
import {FirebaseClientService} from '@canner/image-service-config';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey,
  storageBucket
});

// remember to autauthencate firebase first, or uploading will be failed,
// https://firebase.google.com/docs/auth/web/start
firebase.auth().signInAnonymously();

const imageService = new FirebaseClientService({
  firebase: firebase,
  dir: "the/path/to", // specify the path you want upload to 
  filename: "filename", // rename file without extension
  hash: false, // if true, the filename will add a hash string, e.g.: `filename-${hash}.jpg`
});

const serviceConfig = imageService.getServiceConfig();

console.log(serviceConfig);
// see https://github.com/react-component/upload#customrequest
// {
//   customRequest: Function
// }
```

### FirebaseAdminService (Firebase admin SDK)

Firebase admin SDK support.

<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>default</th>
    <th>description</th>
  </tr>
  <tr>
    <td>getSignedUrl</td>
    <td><code>(file: File, filePath: string) =&gt; Promise&lt;{uploadUrl: string, publicUrl: sring}&gt;</code></td>
    <td>null</td>
    <td>(required) async method to get the signedUrl and publicUrl of firebase storage</td>
  </tr>
  <tr>
    <td>filename</td>
    <td>string</td>
    <td>''</td>
    <td>(optional) filename without extension</td>
  </tr>
  <tr>
    <td>dir</td>
    <td>string</td>
    <td>''</td>
    <td>(optional) directory name,  eg: `path/to/you/want`  </td>
  </tr>
  <tr>
    <td>hash</td>
    <td>boolean</td>
    <td>false</td>
    <td>(optional) if true, filename will add a postfix hash, e.g.: filename-&lt;hash&gt;.png</td>
  </tr>
</table>

#### methods
<table>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>description</th>
  </tr>
  <tr>
    <td>getServiceConfig</td>
    <th><code>() => {customRequest: Function}</code>. See https://github.com/react-component/upload#customrequest</th>
    <td>return the uploading configurations for firebase admin sdk </td>
  </tr>
    <tr>
    <td>setHash</td>
    <th><code>boolean => ImageService</code></th>
    <td>set the hash</td>
  </tr>
  <tr>
    <td>setDir</td>
    <th><code>string => ImageService</code></th>
    <td>set the dir</td>
  </tr>
  <tr>
    <td>setFilename</td>
    <th><code>string => ImageService</code></th>
    <td>set the filename</td>
  </tr>
</table>

``` js
import {FirebaseAdminService} from '@canner/image-service-config';

function getSignedUrl(file, filePath) {
  // GET your API server
  return fetch('<YOUR_API_ENDPOINT>')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // {
      //   uploadUrl: '<FIREBASE_SIGNED_URL>',
      //   publicUrl: '<FIREBASE_PUBLIC_URL>',
      // }
      return data;
    });
  
}

const imageService = new FirebaseAdminService({
  getSignedUrl,
  dir: "the/path/to", // specify the path you want upload to 
  filename: "filename", // rename file without extension
  hash: false, // if true, the filename will add a hash string, e.g.: `filename-${hash}.jpg`
});

const serviceConfig = imageService.getServiceConfig();
console.log(serviceConfig);
// see https://github.com/react-component/upload#customrequest
// {
//   customRequest: Function
// }
```

**backend code in koa**
``` js
// use firebase admin sdk to generate signedUrl and publicUrl
// https://firebase.google.com/docs/storage/admin/start
let firebaseApp;
try {
  firebaseApp = firebaseAdmin.app(service.config.projectId);
} catch (e) {
  firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(service.config.serviceAccountJson),
    databaseURL: service.config.databaseURL,
    storageBucket: service.config.storageBucket
  }, service.config.projectId);
}

const bucket = firebaseApp.storage().bucket();
const token = UUID();
const urls = await bucket.file(filepath)
.createResumableUpload({
  origin: `https://<YOUR WEBSITE HOST>`,
  metadata: {
    contentType,
    metadata: {
      firebaseStorageDownloadTokens: token
    }
  }
});
ctx.body = {
  uploadUrl: urls[0],
  publicUrl: `https://firebasestorage.googleapis.com/v0/b/${service.config.storageBucket}/o/${encodeURIComponent(filepath.startsWith("/") ? filepath.slice(1) : filepath)}?alt=media&token=${token}`
};
```
