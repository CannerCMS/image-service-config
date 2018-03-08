import * as React from 'react';
import ReactDOM from 'react-dom';
import ImgurDemo from './imgurDemo';
import FirebaseClientDemo from './firebaseClientDemo';
import {Divider, Card} from 'antd';
ReactDOM.render(
  <div>
    <Card title="imgur" style={{margin: 16}}>
      <ImgurDemo />
    </Card>
    <Card title="filebase client" style={{margin: 16}}>
      <FirebaseClientDemo />
    </Card>
  </div>
, document.getElementById('root'));