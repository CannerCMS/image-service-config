// @flow

import ImageService from "./imageService";

export default class ImgurService extends ImageService {
  clientId: string;
  mashapeKey: ?string;

  constructor({
    clientId = "",
    mashapeKey
  }: {
    clientId: string,
    mashapeKey?: string
  }) {
    super();
    this.clientId = clientId;
    this.mashapeKey = mashapeKey;
  }
  getServiceConfig() {
    if (this.mashapeKey) {
      return {
        name: "image",
        accept: "image/*",
        action: "https://imgur-apiv3.p.mashape.com/3/image",
        headers: {
          "X-Mashape-Key": this.mashapeKey,
          Authorization: `Client-ID ${this.clientId}`,
          "X-Requested-With": null // https://github.com/react-component/upload/issues/33
        }
      };
    }

    return {
      name: "image",
      accept: "image/*",
      action: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
        "X-Requested-With": null // https://github.com/react-component/upload/issues/33
      }
    };
  }
}
