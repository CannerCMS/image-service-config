import firebase from "firebase";
import ImageService from "./imageService";
import config from "@canner/canner-config";

export default class FirebaseService extends ImageService {
  getServiceConfig() {
    return {
      customRequest: function(obj) {
        // 在這裡不處理 firebase 的登入，
        // 登入應該要在 canner-web 的 qaformContainer 完成
        // 如果沒有登入 無法上傳
        const { file, onProgress, onSuccess, onError } = obj;
        const app = config.getEndpointByKey(this.payload.key).app;
        const hash = randomString();
        const fileExtension = file.name.split('.').slice().pop();
        const filename = `${file.name}-${hash}.${fileExtension}`;
        const images = firebase
          .storage(app)
          .ref(`CANNER_CMS/${this.dir}`)
          .child(this.filename || filename);
        const uploadTask = images.put(file);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            const percent =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
            onProgress({ percent });
          },
          function() {
            onError();
          },
          function() {
            onSuccess({ data: { link: uploadTask.snapshot.downloadURL } });
          }
        );
      }.bind(this)
    };
  }
}

function randomString() {
  return Math.random().toString(36).substr(2, 6);
}
