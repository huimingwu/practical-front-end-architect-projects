const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('builddev', () => {
    return watch('./src/nodeui/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeui/**/*.js')
            .pipe(babel({
                //关闭外部的babelrc
                babelrc: false,
                // presets: ['@babel/env'],
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});
let _task = ['builddev'];
if (process.env.NODE_ENV == "production") {
    _task = []
}
gulp.task('default', _task);