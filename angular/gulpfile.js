var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');

// File paths
var paths = {
  src: 'src',
  dist: 'dist',
  scripts: {
    src: 'src/app/**/*.js',
    dest: 'dist/js'
  },
  styles: {
    src: 'src/assets/css/**/*.css',
    dest: 'dist/css'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  vendor: {
    js: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-route/angular-route.min.js'
    ],
    dest: 'dist/vendor'
  }
};

// Clean dist folder
function clean() {
  return del([paths.dist]);
}

// Process HTML files
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Process and bundle JS files
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Process and minify CSS files
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Copy vendor files
function vendor() {
  return gulp.src(paths.vendor.js)
    .pipe(gulp.dest(paths.vendor.dest))
    .pipe(browserSync.stream());
}

// Watch files for changes
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
}

// Start dev server with BrowserSync
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    },
    port: 3000
  });
  
  watch();
}

// Define complex tasks
var build = gulp.series(clean, gulp.parallel(html, scripts, styles, vendor));

// Export tasks
exports.clean = clean;
exports.build = build;
exports.serve = gulp.series(build, serve);
exports.default = build;
