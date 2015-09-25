var url = require('url');
var fs = require('fs');
var path = require('path');

module.exports = function(req, res, next){
  var urlObj = url.parse(req.url, true);
  var dir = path.join(__dirname, './data/');
  var fileNames = fs.readdirSync(dir)
    .filter(function(x) {return x.split('.')[1] === 'json'})
    .map(function(x) {return '/' + x.split('.')[0];});
  var hasFile = false;

  // 查找本地是否存在这个文件
  fileNames.forEach(function(name) {
      if (urlObj.pathname === name) {
          hasFile = true;
      }
  });
  // 拦截到请求里本地存在这个文件
  if (hasFile) {
      var filePath = './data/' + urlObj.pathname + '.json';
      // 删除缓存区里的某个模块 删除该模块后，下次加载该模块时重新运行该模块
      delete require.cache[require.resolve(filePath)];
      if (urlObj.query&&urlObj.query.callback) {
          res.setHeader('Content-type', 'application/javascript');
          res.end(urlObj.query.callback + '(' + JSON.stringify(require(filePath)) + ')');
      } else {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(require(filePath)));
      }
      return;
  }

  next();
};
