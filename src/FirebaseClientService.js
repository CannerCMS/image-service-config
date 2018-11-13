// @flow

import ImageService from "./imageService";
import { randomString, splitFilename } from "./utils";
import type { CustomRequestArgs } from "./types";

export default class FirebaseService extends ImageService {
  firebase: any;

  constructor({
    dir,
    hash,
    filename,
    firebase
  }: {
    dir?: string,
    hash?: boolean,
    filename?: string,
    firebase: any
  }) {
    super();
    this.dir = dir || "";
    this.hash = Boolean(hash);
    this.filename = filename || "";
    if (!firebase) {
      throw new Error("firebase client instance is required.");
    }
    this.firebase = firebase;
  }
  getServiceConfig() {
    return {
      customRequest: function(obj: CustomRequestArgs) {
        const { file, onProgress, onSuccess, onError } = obj;
        const { fileExtension, nameWithoutExtension } = splitFilename(
          file.name
        );
        let filename = this.filename || nameWithoutExtension;
        if (this.hash) {
          const hash = randomString();
          filename = `${filename}-${hash}.${fileExtension}`;
        } else {
          filename = `${filename}.${fileExtension}`;
        }
        const images = this.firebase
          .storage()
          .ref(this.dir || "")
          .child(filename);
        const uploadTask = images.put(file);
        uploadTask.on(
          this.firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            const percent =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
            onProgress({ percent });
          },
          function(e) {
            onError(e);
          },
          function() {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              onSuccess({ data: { link: downloadURL } });
            });
          }
        );
      }.bind(this)
    };
  }
}
