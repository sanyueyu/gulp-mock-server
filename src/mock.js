var url = require('url');
var fs = require('fs');
var path = require('path');
var rd = require('rd');
var CWD = process.cwd();

module.exports = function(req, res, next){
  // mt is mocktag 作为标示,相同url参数不同请求的数据不同
  var mt = req.query.mt || req.body.mt || '';
  var urlObj = url.parse(req.url, true);
  var fullName = urlObj.pathname + mt;
  var dir = path.join(CWD, './data/');
  var fileNames = rd.readSync(dir)
    .filter(function(x) {return x.split('.')[1] === 'json'})
    .map(function(x) {return x.split(path.sep + 'data' + path.sep)[1];})
    .map(function(x) {return '/' + x.split('.')[0];});
  var hasFile = false;

  // 查找本地是否存在这个文件
  fileNames.forEach(function(name) {
      if (fullName === name.replace(path.sep, '/')) {
          hasFile = true;
      }
  });
  // 拦截到请求里本地存在这个文件
  if (hasFile) {
      var filePath = path.join(CWD, './data/' + fullName + '.json');
      console.log('[gulp-mock-server]', req.url + '=>' + filePath);
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
