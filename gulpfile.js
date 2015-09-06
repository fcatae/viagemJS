var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('tsc', function() {
	var tsfiles = gulp.src('*.ts')
					.pipe(ts());
	
	return tsfiles.js.pipe(gulp.dest(''));
		
});