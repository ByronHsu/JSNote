# Gitmoji

### gulpfile.babel.js

```js
'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import pug from 'gulp-pug'
import pugLint from 'gulp-pug-lint'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import gitmojis from './src/data/gitmojis.json'
import contributors from './src/data/contributors.json'
import ghPages from 'gulp-gh-pages'

const baseDirs = {
  src: 'src/',
  dist: 'dist/'
}

const routes = {
  templates: {
    pug: `${baseDirs.src}templates/*.pug`,
    _pug: `${baseDirs.src}templates/_includes/*.pug`
  },
  styles: {
    scss: `${baseDirs.src}styles/*.scss`,
    _scss: `${baseDirs.src}styles/_includes/*.scss`
  },
  files: {
    html: `${baseDirs.dist}`,
    css: `${baseDirs.dist}css/`,
    deploy: `${baseDirs.dist}**/*`,
    staticSrc: `${baseDirs.src}static/**/*`,
    staticDist: `${baseDirs.dist}static/`
  }
}

gulp.task('templates', ['styles'], () => {
  return gulp.src([routes.templates.pug, '!' + routes.templates._pug])
    .pipe(pugLint())
    .pipe(plumber({}))
    .pipe(pug({
      locals: { 'emojis': gitmojis, 'contributors': contributors }
    }))
    .pipe(gulp.dest(routes.files.html))
    .pipe(browserSync.stream())
})

gulp.task('styles', () => {
  return gulp.src(routes.styles.scss)
    .pipe(plumber({}))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(routes.files.css))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['styles', 'templates'], () => {
  browserSync.init({
    server: `${baseDirs.dist}`
  })

  gulp.watch([routes.templates.pug, routes.templates._pug], ['templates'])
  gulp.watch([routes.styles.scss, routes.styles._scss], ['styles'])
})

gulp.task('build', ['templates', 'styles'], () => {
  gulp.src([routes.files.staticSrc]).pipe(gulp.dest(routes.files.staticDist))
})

gulp.task('deploy', () => {
  return gulp.src(routes.files.deploy)
    .pipe(ghPages({ message: ':rocket: gitmoji website' }))
})

gulp.task('dev', ['serve'])

gulp.task('default', () => {
  gulp.start('dev')
})
```
#### gulp-api
- ``gulp.src:`` ! -> exclude

#### plumber
- Prevent pipe breaking caused by errors from gulp plugins

#### gulp-pug
- ``opts.locals`` (Object): Locals to compile the Pug with.

#### browsersync

```js
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
```
```js
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
```