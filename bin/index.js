#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');
var argv = require('optimist').argv;

var pkg = require('../package.json');

program.version(pkg.version, '-v, --version')
  .usage('[options]')
  .description('mock接口工具'.blue)
  .option('-e, --server [mockRoot]', 'start mock server')
  .option('-p, --port [port]', 'server port config')
  .option('-f, --fetch [url]', 'download remote url to local json file')
  .parse(process.argv);

require('../src/command.js').exec(argv);
