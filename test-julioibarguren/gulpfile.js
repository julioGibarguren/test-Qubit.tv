var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var jsonMinify = require('gulp-jsonminify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
    
});

gulp.task('jsonminify', function(){
    return gulp.src('app/js/**/*.json')
    .pipe(jsonMinify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
     return gulp.src('app/images/**/*.+(png)')
     .pipe(cache(imagemin({
         optimizationLevel: 5
     })))
     .pipe(gulp.dest('dist/images'))
 })

gulp.task('clean:dist', function(){
    return del.sync('dist');
})

gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build',function(callback){
    runSequence('clean:dist',
               ['watch','sass','jsonminify', 'useref', 'images', 'browserSync' ],
               callback
               )
});


