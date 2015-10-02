var request = require('supertest');
var webserver = require('../src');
var File = require('gulp-util').File;
var testJSON = require('../data/test');
var testJSON1 = require('../data/test1');
var xiaoming = require('../data/class/xiaoming');
var url = 'http://localhost:8000';

describe('gulp-mock-serve', function(){
  var stream;

  afterEach(function() {
      stream.emit('kill');
  });

  it('mock /test =>  test.json', function(done) {
      stream = webserver();
      request(url)
        .get('/test')
        .expect(200, testJSON)
        .end(function(err) {
          if (err) return done(err);
          done(err);
        });
  });

  it('mock /test?mt=1 =>  test1.json', function(done) {
      stream = webserver();
      request(url)
        .get('/test?mt=1')
        .expect(200, testJSON1)
        .end(function(err) {
          if (err) return done(err);
          done(err);
        });
  });

  it('mock post /test =>  test1.json and mt=1', function(done) {
      stream = webserver();
      request(url)
        .post('/test')
        .send({'mt': '1'})
        .expect(200, testJSON1)
        .end(function(err) {
          if (err) return done(err);
          done(err);
        });
  });

  it('mock /class/xiaoming =>  class/xiaoming.json', function(done) {
      stream = webserver();
      request(url)
        .get('/class/xiaoming')
        .expect(200, xiaoming)
        .end(function(err) {
          if (err) return done(err);
          done(err);
        });
  });
});
