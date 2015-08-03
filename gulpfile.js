var gulp = require('gulp')
var util = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var gulpIf = require('gulp-if')
var autoprefixer = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')
var ngAnnotate = require('gulp-ng-annotate')
var stripDebug = require('gulp-strip-debug')
var uglify = require('gulp-uglify')
var browserSync = require('browser-sync').create()

var dev = !util.env.production

gulp.task('assets', function () {
  return gulp.src("bower_components/bootstrap/dist/fonts/**")
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('css', function () {
  return gulp.src([
    dev ? 'bower_components/bootstrap/dist/css/bootstrap.css'
      : 'bower_components/bootstrap/dist/css/bootstrap.min.css',
    dev ? 'bower_components/bootstrap/dist/css/bootstrap-theme.css'
      : 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'bower_components/codemirror/lib/codemirror.css',
    'bower_components/codemirror/theme/monokai.css',
    'src/css/**.css'
  ]).pipe(gulpIf(dev, sourcemaps.init()))
    .pipe(gulpIf('src/css/**.css', autoprefixer()))
    .pipe(concat('style.css'))
    .pipe(gulpIf(!dev, minifyCss()))
    .pipe(gulpIf(dev, sourcemaps.write()))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function () {
  return gulp.src([
    dev ? 'bower_components/angular/angular.js'
      : 'bower_components/angular/angular.min.js',
    dev ? 'bower_components/angular-animate/angular-animate.js'
      : 'bower_components/angular-animate/angular-animate.min.js',
    dev ? 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
      : 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/codemirror/lib/codemirror.js',
    'bower_components/codemirror/mode/xml/xml.js',
    'bower_components/codemirror/mode/css/css.js',
    'bower_components/codemirror/mode/javascript/javascript.js',
    'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
    dev ? 'bower_components/angular-ui-codemirror/ui-codemirror.js'
      : 'bower_components/angular-ui-codemirror/ui-codemirror.min.js',
    'src/js/**.js'
  ]).pipe(gulpIf(dev, sourcemaps.init()))
    .pipe(gulpIf('src/js/**.js', ngAnnotate()))
    .pipe(concat('app.js'))
    .pipe(gulpIf(!dev, stripDebug()))
    .pipe(gulpIf(!dev, uglify()))
    .pipe(gulpIf(dev, sourcemaps.write()))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function () {
  return gulp.src('src/**.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['assets', 'css', 'js', 'html'])

gulp.task('build', ['default'])

gulp.task('watch', ['default'], function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })

  gulp.watch('src/css/**.css', ['css', browserSync.reload])
  gulp.watch('src/js/**.js', ['js', browserSync.reload])
  gulp.watch('src/**.html', ['html', browserSync.reload])
})
