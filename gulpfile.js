var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('tsc', function() {
	var tsfiles = gulp.src('ts/*.ts')
					.pipe(ts());	
	return tsfiles.js.pipe(gulp.dest('www/'));	
});

gulp.task('lib', function() {
	return gulp.src('lib/*.js')
		.pipe(gulp.dest('www/lib/'));
});

gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(gulp.dest('www/'));
});

gulp.task('default', ['tsc', 'lib', 'html']);