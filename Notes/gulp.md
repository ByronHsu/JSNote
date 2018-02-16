# Gulp
> The streaming build system

### Example

```js
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        // saves the compiled CSS file in our dist/css directory.
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
// Array -> parellel
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
```

- watch

	The watch task is used to run tasks as we make changes to our files. As you write code and modify your files, the ``gulp.watch()`` method will listen for changes and automatically run our tasks again so we don't have to continuously jump back to our command-line and run the gulp command each time.
	
### API

- gulp.src(globs[, options])
	- globs

		A glob that begins with ``!`` excludes matching files from the glob results up to that point.

#### reference 

https://travismaynard.com/writing/getting-started-with-gulp