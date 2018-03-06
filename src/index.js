// @flow

import FirebaseService from "./FirebaseService";
import ImgurService from "./ImgurService";

type Config = {
  service: 'imgur' | 'firebase',
  dir?: string,
}

type Payload = {
  [string]: mixed
}

export default function(config: Config, payload: Payload) {
  const { service } = config;
  switch (service) {
    case "imgur":
      return new ImgurService(config, payload);
    case "firebase":
    default:
      return new FirebaseService(config, payload);
  }
}
