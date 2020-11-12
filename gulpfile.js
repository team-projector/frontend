const gulp = require('gulp');
const todo = require('gulp-todo');

gulp.task('todos', () => {
  return gulp.src([
    'src/**/*.{ts,html,scss}'
  ], {base: '.'})
    .pipe(todo())
    .pipe(gulp.dest('./'));
});
