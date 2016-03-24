#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');
var argv = require('optimist').argv;

var pkg = require('../package.json');

program.version(pkg.version, '-v, --version')
  .usage('[options]')
  .description('mock接口工具'.blue)
  .option('-e, --server [mockRoot]', '启动接口服务器')
  .option('-p, --port [port]', '接口服务器端口')
  .parse(process.argv);

require('../src/command.js').exec(argv);
