var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('scripts', function() {
	var tsResult = gulp.src('*.ts')
		.pipe(ts());
	
	return tsResult.js.pipe(gulp.dest(''));
});

gulp.task('watch', ['scripts'], function() {
	gulp.watch('*.ts', ['scripts']);
});