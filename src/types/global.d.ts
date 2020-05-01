declare module NodeJS {

  interface Global {
    /**
     * 服務啟動檔案（server.js）的路徑
     */
    base_dir: string;
    /**
     * 專案跟目錄
     */
    root_dir: string;
  }
}
