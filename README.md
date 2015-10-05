# gulp-mock-server
<img src="http://i3.tietuku.com/f13139dfa841e17d.png" /><br />
### to be the most simple gulp mock tool in the world

## feature
1. don't need to write mock url, only to make a directory named "data" in the root and put json file in 
2. support jsonp automatically 
3. support multi-level directory such as: 

 >'host + /class/xiaoming'  => response file 'data/class/xiaoming.json'

3. support select load by request.query/request.body such as: 
 >'host + /test'  => response file 'data/test.json'

 >'host + /test?mt=1' => response file 'data/test1.json'

 'mt' is the abbreviation of 'macktag'
3. may be others

## Install

```sh
$ npm install --save-dev gulp-mock-server
```

## Usage

### first step
make a directory named "data" in the root directory

### second step
webserver config: 

```js
var gulp = require('gulp');
var mockServer = require('gulp-mock-server');

gulp.task('mock', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      port: 8090,
      open: true
    }));
});
```
put a json file such as "test.json" in the "/data" directory

### third step
visit url => localhost:8090/test

 so easy!

## Options

Key | Type | Default | Description |
--- | --- | --- | --- |
`host` | String | `localhost` | hostname of the webserver
`port` | Number | `8000` | port of the webserver
`path` | String | `/` | path to the webserver
`livereload` | Boolean/Object | `false` | whether to use livereload. For advanced options, provide an object. You can use the 'port' property to set a custom live reload port and the `filter` function to filter out files to watch. The object also needs to set `enable` property to true (e.g. `enable: true`) in order to activate the livereload mode. It is off by default.
`directoryListing` | Boolean/Object | `false` | whether to display a directory listing. For advanced options, provide an object with the 'enable' property set to true. You can use the 'path' property to set a custom path or the 'options' property to set custom [serve-index](https://github.com/expressjs/serve-index) options.
`fallback` | String | `undefined` | file to fall back to (relative to webserver root)
`open` | Boolean/String | `false` | open the localhost server in the browser. By providing a String you can specify the path to open (for complete path, use the complete url `http://my-server:8080/public/`) .
`https` | Boolean/Object | `false` | whether to use https or not. By default, `gulp-webserver` provides you with a development certificate but you remain free to specify a path for your key and certificate by providing an object like this one: `{key: 'path/to/key.pem', cert: 'path/to/cert.pem'}`.
`proxies` | Array | `[]`| a list of proxy objects.  Each proxy object can be specified by `{source: '/abc', target: 'http://localhost:8080/abc', options: {headers: {'ABC_HEADER': 'abc'}}}`.

