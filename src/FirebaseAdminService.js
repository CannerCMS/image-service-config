// @flow

import ImageService from "./imageService";
import axios from "axios";
import Promise from "promise-polyfill";
import type { CustomRequestArgs } from "./types";
import { randomString, splitFilename } from "./utils";

export default class FirebaseAdminService extends ImageService {
  getSignedUrl: (
    file: File,
    filePath: string
  ) => Promise<{
    uploadUrl: string,
    publicUrl: string
  }>;
  dir: ?string;
  filename: ?string;
  hash: ?boolean;

  constructor({
    getSignedUrl,
    dir,
    filename,
    hash
  }: {
    getSignedUrl: (
      file: File,
      filePath: string
    ) => Promise<{
      uploadUrl: string,
      publicUrl: string
    }>,
    dir?: string,
    filename?: string,
    hash?: boolean
  }) {
    super();
    this.getSignedUrl = getSignedUrl;
    this.dir = dir;
    this.filename = filename;
    this.hash = hash;
  }

  getServiceConfig() {
    return {
      customRequest: function(obj: CustomRequestArgs) {
        const { file, onProgress, onSuccess, onError } = obj;
        const { fileExtension, nameWithoutExtension } = splitFilename(
          file.name
        );
        let filename = file.name;
        if (this.hash) {
          const hash = randomString();
          filename = `${this.filename ||
            nameWithoutExtension}-${hash}.${fileExtension}`;
        } else {
          filename = `${this.filename ||
            nameWithoutExtension}.${fileExtension}`;
        }
        let filePath = this.dir ? `${this.dir}/${filename}` : filename;
        this.getSignedUrl(file, filePath)
          .then(data => {
            return axios
              .put(data.uploadUrl, file, {
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
              });
          })
          .then(url => {
            onSuccess({
              data: { link: url }
            });
          })
          .catch(onError);
      }.bind(this)
    };
  }
}
