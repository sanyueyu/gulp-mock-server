var path = require('path');

var server = require('./index.js');

module.exports = {
  exec: function(argv) {
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
