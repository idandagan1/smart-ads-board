'use strict';

/* eslint no-console: 0 */

const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');


gulp.task('webpack:build', function (callback) {
    const webpackBuildConf = Object.create(webpackConfig);
    webpackBuildConf.devtool = 'eval';
    webpackBuildConf.debug = false;
    webpackBuildConf.context = __dirname;

    webpack(webpackBuildConf, function (err, stats) {
        let options = {
            colors: true
        };

        if (err) {
            process.exit(1);
        }

        if (stats.hasErrors()) {
            options = {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: false,
                cached: false,
                reasons: false,
                source: false,
                errorDetails: true,
                chunkOrigins: false
            };
        }

        console.log(stats.toString(options));
        callback();
    });
});

gulp.task('webpack:dev-server', function () {
    const webpackBuildConf = Object.create(webpackConfig);
    webpackBuildConf.devtool = 'source-map';
    webpackBuildConf.debug = true;

    new WebpackDevServer(webpack(webpackBuildConf, function (err, stats) {
            let options = {
                colors: true
            };

            if (err) {
                process.exit(1);
            }

            if (stats.hasErrors()) {
                options = {
                    colors: true,
                    hash: false,
                    version: false,
                    timings: false,
                    assets: false,
                    chunks: false,
                    chunkModules: false,
                    modules: false,
                    children: false,
                    cached: false,
                    reasons: false,
                    source: false,
                    errorDetails: true,
                    chunkOrigins: false
                };
            }

            console.log(stats.toString(options));
        }),
        {
            proxy: {
                '**': `http://localhost:3000`
            },
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: false,
                cached: false,
                reasons: false,
                source: false,
                errorDetails: true,
                chunkOrigins: false
            }
            // noInfo: true
        }
    ).listen(8889, 'localhost',
        function (err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log('Please wait until webpack compilation is done...');
            // console.log(stats.toString({
            //     colors: true
            // }));
        });
});

gulp.task('lint:client', function () {
    return gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('webpack:watch', function () {
    gulp.watch(['app/**/*', 'public/index.html'], ['webpack:build']);
});

gulp.task('unit:client', () => {
    return gulp.src(`${process.cwd()}/test/**/*.spec.js`, {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan', require: [`${process.cwd()}/test/utils/dom.js`]})).once('error', function (err) {
            console.log(err);
            process.exit(1);
        });
});

