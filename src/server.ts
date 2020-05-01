
import path from 'path';
// 系統目錄設定
global.base_dir = __dirname;
global.root_dir = path.join(__dirname, './..');

import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  );
  console.log(`  Node.js version: ${process.version} `);
  console.log('  Press CTRL-C to stop\n');
});

export default server;