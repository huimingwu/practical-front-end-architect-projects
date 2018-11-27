const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence')
const eslint = require('gulp-eslint');

gulp.task('builddev', () => {
    return watch('./src/nodeui/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeui/**/*.js')
            .pipe(babel({
                //关闭外部的babelrc
                babelrc: false,
                // presets: ['@babel/env'],
                plugins: ["transform-es2015-modules-commonjs","transform-decorators-legacy"]
            }))
            .pipe(gulp.dest('dist'))
    })
});
gulp.task('buildprod', () => {
    gulp.src('./src/nodeui/**/*.js')
        .pipe(babel({
            //关闭外部的babelrc
            babelrc: false,
            ignore: ["./src/nodeui/config/*.js"],
            "plugins": ["transform-es2015-modules-commonjs","transform-decorators-legacy"]
        }))
        .pipe(gulp.dest('dist'))
});
gulp.task('configclean', function () {
    gulp.src('./src/nodeui/**/*.js')
        //   .pipe(sourcemaps.init())
        // transform the files here.
        .pipe(rollup({
            input: './src/nodeui/config/index.js',
            output: {
                format: 'cjs'
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        //   .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});
gulp.task('lint', () => {
    gulp.src('./src/nodeui/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
let _task = ['builddev'];
if (process.env.NODE_ENV == "production") {
    _task = gulpSequence("lint","buildprod", "configclean");
}
if (process.env.NODE_ENV == "lint") {
    _task = ["lint"];
}
gulp.task('default', _task);