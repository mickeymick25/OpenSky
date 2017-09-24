var gulp = require('gulp');
var pug = require('gulp-pug');
// var less = require('gulp-less');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var browserSync = require('browser-sync').create();

// Tasks
gulp.task('default', ['pug','sass','jsroutes']);

gulp.task('pug', function(){
 return gulp.src( 'views/**/*.pug')
 .pipe( pug( {pretty: true}))
 .pipe( gulp.dest('dist/html/'));
});

// gulp.task('less', function(){
//   return gulp.src( 'public/less/**/*.less')
//   .pipe( less())
//   .pipe(gulp.dest( 'dist/stylesheets/'));
// });

gulp.task('sass', function(){
  return gulp.src('public/sass/**/*.sass')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('jsroutes',function(){
  return gulp.src( 'routes/**/*.js')
  .pipe(minify())
  .pipe(gulp.dest('dist/javascripts/'));
});

// Watching
gulp.task('watch', function(){
  browserSync.init({
    port: 4000, //where is browser sync
    proxy: 'http://localhost:3000/', //what are we proxying?
    ui: {port: 4001}, //where is the UI
    browser: [] //empty array of browsers
  });

  gulp.watch('views/**/*.pug', [ 'pug'])
  .on('change', browserSync.reload);

 //  gulp.watch('public/less/**/*.less', [ 'less'])
 // .on('change', browserSync.reload);
  gulp.watch('public/sass/**/*.sass', [ 'sass'])
 .on('change', browserSync.reload);

  gulp.watch('routes/**/*.js', [ 'jsroutes'])
  .on('change', browserSync.reload);
});
