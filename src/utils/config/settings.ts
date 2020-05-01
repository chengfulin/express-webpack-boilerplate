
class Settings implements Settings {
  pathPrefix: string;
  get httpRoot() {
    return this.pathPrefix.trim();
  }
  nodeEnv: string;
  port: number;
  

  constructor() {
    this.pathPrefix = process.env.PATH_PREFIX || '';
    this.nodeEnv = process.env.NODE_ENV || 'production';
    this.port = 3000;
  }
}

export default (new Settings()) as Settings;