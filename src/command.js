var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var request = require('request');

var server = require('./index.js');
var CWD = process.cwd();

module.exports = {
  exec: function(argv) {
    if (argv.fetch || argv.f) {
      var mockDir = argv.server || argv.e;
      mockDir = typeof(mockDir) === 'string' ? mockDir : './data';

      var dir = path.join(CWD, mockDir);
      var url = argv.f;
      if (!url) return;

      var arr = url.split('/');
      // 去除 "http:", "", "hostname",
      var name = arr.pop(dir, arr.slice(3).join('/')).split('?')[0];
      fse.ensureDirSync(path.join(dir, arr.slice(3).join('/')));
      request(url).pipe(fs.createWriteStream(path.join(dir, arr.slice(3).join('/'), name + '.json')));
      console.log('success! file path:' + path.join(dir, arr.slice(3).join('/'), name + '.json'));
    }
    if (argv.server || argv.e) {
      var mockDir = argv.server || argv.e;
      mockDir = typeof(mockDir) === 'string' ? mockDir : './data';
      var port = parseInt(argv.port || argv.p || 9999, 10);
      server({
        mockDir: mockDir,
        port: port
      });
    }
  }
};
