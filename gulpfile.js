var gulp = require('gulp');
var foreach = require('gulp-foreach');
var runSequence = require('run-sequence');
var path = require('path');
var source = require('vinyl-source-stream');
var del = require('del');
var babel = require('gulp-babel');

// Compile app.js
gulp.task('appJS', function(){
  return gulp.src('./src/app.js')
  .pipe(babel({presets: ['node6']}))
  .pipe(gulp.dest('./'));
});

// Compile routes
gulp.task('routes', function(){
  return gulp.src('./src/routes/*')
  .pipe(babel({presets: ['node6']}))
  .pipe(gulp.dest('./routes/'));
});


// Clean
gulp.task('clean', function(){
  del.sync(['./app.js', 'routes']);
});

// Build
gulp.task('build', function(){
  runSequence('clean',['appJS', 'routes']);
});
