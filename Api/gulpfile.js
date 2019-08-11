/* eslint-disable @typescript-eslint/no-var-requires */
var gulp = require('gulp')
var clean = require('gulp-clean')
var ts = require('gulp-typescript')

var tsProject = ts.createProject('tsconfig.json')

gulp.task('clean', function () {
  return gulp.src('dist', { allowEmpty: true }).pipe(clean())
})

gulp.task('compile', function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series('clean', 'compile'))
