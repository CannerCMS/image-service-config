// @flow

import ImageService from "./imageService";

export default class ImgurService extends ImageService {
  getServiceConfig() {
    if (process.env.NODE_ENV === "production") {
      return {
        name: "image",
        accept: "image/*",
        action: "https://imgur-apiv3.p.mashape.com/3/image",
        headers: {
          "X-Mashape-Key": process.env.IMGUR_MASHAPE_KEY,
          "Authorization": "Client-ID cd7b1ab0aa39732",
          "X-Requested-With": null
        }
      };
    }

    return {
      name: "image",
      accept: "image/*",
      action: "https://api.imgur.com/3/image",
      headers: {
        Authorization: "Client-ID a214c4836559c77",
        "X-Requested-With": null
      }
    };
  }
}
