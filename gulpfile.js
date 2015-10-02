var gulp = require('gulp');
var mockServer = require('./src/index');

gulp.task('mock', function() {
    gulp.src('.')
    .pipe(mockServer({
        livereload: {
            enable: false
        },
        directoryListing: {
            enable: true,
            path: 'data'
        },
        port: 8090,
        open: "http://localhost:8090/test"
    }));
});

//注册一个默认任务
gulp.task('default', ['mock']);
