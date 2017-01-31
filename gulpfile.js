'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
const tsProject = ts.createProject('tsconfig.json');


gulp.task('scripts', function() {
    var tsResult = gulp.src("app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
 
    return tsResult.js.
        //pipe(uglify()).
        pipe(sourcemaps.write()).
        pipe(gulp.dest('built'));
});
gulp.task('sass', () => {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles'));
});

gulp.task('default', ['scripts', 'sass'], () => {
    console.log('code compiled');
});

gulp.task('scripts:watch', () => {
  gulp.watch('./app/**/*.ts', ['scripts']);
});
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task(':watch', ['scripts:watch','sass:watch'], () => {
    console.log('started watching');
});