export default class imageService {
  constructor(config, payload) {
    const { dir, filename } = config;
    this.dir = dir;
    this.filename = filename;
    this.payload = payload;
  }
  getServiceConfig() {
    return {};
  }
}
