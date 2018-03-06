// @flow

import ImageService from "./imageService";
import config from "@canner/canner-config";
import axios from "axios";
import Promise from "promise-polyfill";

type RequestObj = {
  file: File,
  onProgress: (obj: {percent: number}) => void,
  onSuccess: (obj: {data: {link: string}}) => void,
  onError: (e: Error) => void,
}

type ServiceConfig = {
  customRequest: RequestObj => Promise<*>
}

export default class FirebaseService extends ImageService {
  dir: ?string;
  payload: {
    key: string;
  };

  getServiceConfig(): ServiceConfig {
    return {
      customRequest: function(obj: RequestObj) {
        const { file, onProgress, onSuccess, onError } = obj;
        const hash = randomString();
        const fileExtension = file.name.split('.').slice().pop();
        const filename = `CANNER_CMS/${this.dir || 'UNDEFINED'}/${file.name}-${hash}.${fileExtension}`;
        const appId = config.getAppId();
        this.getSignedUrl({
          key: this.payload.key,
          appId,
          filepath: `${filename}`,
          contentType: file.type
        })
          .then(data => {
            return axios.put(data.uploadUrl, file, {
              onUploadProgress: e => {
                const done = e.position || e.loaded;
                const total = e.totalSize || e.total;
                const percent = done / total * 100;
                onProgress({ percent });
              },
              headers: {
                "Content-Type": file.type,
                "X-Upload-Content-Type": file.type,
                "X-Upload-Content-Length": file.size
              }
            })
            .then(() => {
              return data.publicUrl;
            })
          })
          .then(url => {
            onSuccess({
              data: { link: url}
            });
          })
          .catch(onError);
      }.bind(this)
    };
  }

  getSignedUrl({
    key,
    filepath,
    appId,
    contentType
  }: {
    key: string,
    filepath: string,
    appId: string,
    contentType: string
  }): Promise<*> {
    return axios.post(getStorageUrl(), {
      key,
      filepath,
      appId,
      contentType
    })
    .then(function(res) {
      return res.data;
    })
  }
}

function randomString(): string {
  return Math.random().toString(36).substr(2, 6);
}

function getStorageUrl(): string {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://backend.canner.io/storage";
    case "development":
    default:
      return "https://local.host:1234/storage";
  }
}