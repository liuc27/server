var gulp = require('gulp');
var foreach = require('gulp-foreach');
var runSequence = require('run-sequence');
var path = require('path');
var source = require('vinyl-source-stream');
var del = require('del');
var babel = require('gulp-babel');
var nodemon = require('nodemon');

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

// Compile models
gulp.task('models', function(){
  return gulp.src('./src/models/*')
  .pipe(babel({presets: ['node6']}))
  .pipe(gulp.dest('./models/'));
});

// Clean
gulp.task('clean', function(){
  del.sync(['./app.js', 'routes', 'models']);
});

// Build
gulp.task('build', function(){
  runSequence('clean',['appJS', 'routes', 'models']);
});

// Watch
gulp.task('watch', function(){
  gulp.watch('./src/app.js', ['appJS']);
  gulp.watch('./src/routes/*', ['routes']);
  gulp.watch('./src/models/*', ['models']);
});

// Nodemon
gulp.task('nodemon', function(){
  nodemon({
    script: './app.js',
    nodeArgs: ['--harmony'],
    env: {
      NODE_ENV: 'development'
    }
  });
});

// Development mode
gulp.task('dev', ['watch'], function(){
  return runSequence('clean', 'build', 'nodemon');
});
