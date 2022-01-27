'use strict'

const {src, dest} = require('gulp'),
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssbeautify = require('gulp-cssbeautify'),
  removeComments = require('gulp-strip-css-comments'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  rigger = require('gulp-rigger'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  pug = require('gulp-pug'),
  browsersync = require('browser-sync').create(),
  babel = require('gulp-babel')


/* Paths */
const path = {
  build: {
    html: 'dist/',
    js: 'dist/assets/js/',
    css: 'dist/assets/css/',
    images: 'dist/assets/img/',
    fonts: 'dist/assets/fonts/'
  },
  src: {
    html: 'src/*.pug',
    js: 'src/assets/js/**/*.js',
    css: 'src/assets/sass/style.scss',
    images: 'src/assets/img/**/*.{jpg,png,svg,gif,ico}',
    fonts: 'src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  },
  watch: {
    html: 'src/**/*.pug',
    js: 'src/assets/js/**/*.js',
    css: 'src/assets/sass/**/*.scss',
    images: 'src/assets/img/**/*.{jpg,png,svg,gif,ico}',
    fonts: 'src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'
  },
  clean: './dist'
}


/* Tasks */
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  })
}

function browserSyncReload(done) {
  browsersync.reload()
}

function html() {
  return src(path.src.html, {base: 'src/'})
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function favicon() {
  return src('src/favicon.ico')
    .pipe(dest('dist/'))
}

function css() {
  return src(path.src.css, {base: 'src/assets/sass/'})
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      Browserslist: ['last 8 versions'],
      cascade: true
    }))
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(removeComments())
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js, {base: './src/assets/js/'})
    .pipe(plumber())
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.images)
    .pipe(imagemin())
    .pipe(dest(path.build.images))
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function clean() {
  return del(path.clean)
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.images], images)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, favicon))
const watch = gulp.parallel(build, watchFiles, browserSync)


/* Exports Tasks */
exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch
exports.fonts = fonts
