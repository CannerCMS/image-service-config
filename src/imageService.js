// @flow

import type { UploadConfig } from "./types";

export default class ImageService {
  hash: ?boolean;
  dir: ?string;
  filename: ?string;

  getServiceConfig(): UploadConfig {
    return {};
  }

  setHash(hash: boolean) {
    this.hash = hash;
    return this;
  }

  setDir(dir: string) {
    this.dir = dir;
    return this;
  }

  setFilename(filename: string) {
    this.filename = filename;
    return this;
  }
}
