var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');

gulp.task('serve', function() {

    browserSync.init({
        server: ".",
        notify: false
    });

    gulp.watch("sass/**/*.sass", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("sass/**/*.sass")
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest("css/"))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css'));
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(minify({
        ext:{
            src:'script.js',
            min:'.js'
        },
        exclude: ['tasks']
        //ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('js'))
});

gulp.task('default', ['serve']);
