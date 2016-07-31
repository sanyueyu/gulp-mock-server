var request = require('supertest');
var webserver = require('../src');
var File = require('gulp-util').File;
var testJSON = require('../data/test.json');
var testDoJSON = require('../data/test.do.json');
var testJSON1 = require('../data/test1');
var xiaoming = require('../data/class/xiaoming');
var shanghai = require('../data/huang/yangguo/shanghai');
var checkOne = require('../data/check_one.json');
var testJSONJS = require('../data/test.json.js');
var url = 'http://localhost:8000';

describe('gulp-mock-serve', function(){
  var stream;

  afterEach(function() {
      stream.emit('kill');
  });

  it('mock /test =>  test.json', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .get('/test')
          .expect(200, testJSON)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);
  });

  it('mock /test?mt=1 =>  test1.json', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .get('/test?mt=1')
          .expect(200, testJSON1)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);
  });

  it('mock post /test =>  test1.json and mt=1', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .post('/test')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({'mt': '1'})
          .expect(200, testJSON1)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);
  });

  it('mock get /check.do?id=123 =>  check_one.json', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .post('/check.do')
          .send({'id': '123'})
          .expect(200, checkOne)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);
  });
  it('mock post /test.do =>  test.do.json', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .post('/test.do')
          .expect(200, testDoJSON)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);

  });

  it('mock /class/xiaoming =>  class/xiaoming.json', function(done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
          .get('/class/xiaoming')
          .expect(200, xiaoming)
          .end(function(err) {
            if (err) return done(err);
            done(err);
          });
      }, 500);
  });

  it('mock /huang/yangguo/shanghai =>  huang/yangguo/shanghai.json', function (done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
            .get('/huang/yangguo/shanghai')
            .expect(200, shanghai)
            .end(function (err) {
              if (err) return done(err);
              done(err);
        });
      }, 500);
  });
  it('mock /test.json =>  test.json.js', function (done) {
      stream = webserver();
      setTimeout(function() {
        request(url)
            .get('/test.json')
            .expect(200, testJSONJS)
            .end(function (err) {
              if (err) return done(err);
              done(err);
        });
      }, 500);
  });

});
