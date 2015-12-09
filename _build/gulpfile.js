var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var notify = require("gulp-notify");

var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./lib/'));
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('../assets/js/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../assets/css'));
});

gulp.task('copy-bourbon',function(){
    return gulp.src('./lib/bourbon/app/assets/stylesheets/**/*',{
        base:'./lib/bourbon/app/assets/stylesheets/'
    }).pipe(gulp.dest('./scss/bourbon/'));
});

gulp.task('copy-neat',function(){
    return gulp.src('./lib/neat/app/assets/stylesheets/**/*',{
        base:'./lib/neat/app/assets/stylesheets/'
    }).pipe(gulp.dest('./scss/neat/'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('../'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('../assets/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('../assets/js'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('../assets/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('../assets/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('../assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('assets/js/*.js', ['jshint']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('notify', function() {
  gulp.src("../assets/css/styles.css")
  .pipe(notify("Hello Gulp!"));
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);
gulp.task('copy', ['copy-bourbon','copy-neat']);

gulp.task('prebuild', gulpsync.sync(['bower','copy']));
gulp.task('preflight',['images'])

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles']);







