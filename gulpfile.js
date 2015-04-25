var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('gulp-bower');
var connect = require('gulp-connect');
var less = require('gulp-less');
var jasmine = require('gulp-jasmine');

gulp.task('tests', function () {
  return gulp.src('tests/*.js')
    .pipe(jasmine());
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('install', ['bower'], function() {
  var bc = 'bower_components',
    files = [
      bc + '/jquery/dist/jquery.js',
      bc + '/bootstrap/dist/js/bootstrap.js'
    ];

  return gulp.src(files)
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('serve', ['watch'], function () {
  connect.server({
      port: 8080,
      root: './dist',
      livereload: true
    });
});

gulp.task('html', function () {
  console.log("html updated");
  gulp.src('./src/**.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src(['./src/less/app.less', './src/less/bootstrap.less'])
    .pipe(less()) // should use paths: [ path.join(__dirname, 'src', 'includes') ]
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**.html'], ['html']);
  gulp.watch(['./src/less/*.less'], ['less']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/images/*'], ['images'])
});

gulp.task('default', ['less', 'html', 'js', 'images'], function(){

});