// @flow

type Config = {
  service: 'imgur' | 'firebase',
  dir?: string,
}

type Payload = {
  [string]: any
}

type ServiceConfig = {
  [string]: any
}

export default class ImageService {
  dir: ?string;
  payload: Payload;

  constructor(config: Config, payload: Payload) {
    const { dir } = config;
    this.dir = dir;
    this.payload = payload;
  }
  getServiceConfig(): ServiceConfig {
    return {};
  }
}
