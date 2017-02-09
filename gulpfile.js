var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var ProgressPlugin = new webpack.ProgressPlugin(
    function (percentage, msg) {
        gutil.log((percentage * 100).toFixed(2) + "%", msg);
    });

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", function () {
    // modify some webpack config options
    var myConfig = require("./config/webpack.dev")();
    myConfig.plugins.push(ProgressPlugin);

    // run webpack
    webpack(myConfig).watch(null, function (err, stats) {
        if (err) throw new gutil.PluginError("build-dev", err);
        gutil.log("[build-dev]", stats.toString({
            colors: true
        }));
    });
});

// Production build
gulp.task("build", function (callback) {
    process.env.npm_lifecycle_event += 'aot';

    // modify some webpack config options
    var myConfig = require("./config/webpack.prod")();
    myConfig.bail = true;
    myConfig.plugins.push(ProgressPlugin);

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("build", err);
        gutil.log("[build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = require("./config/webpack.prod")();
    myConfig.bail = true;
    myConfig.plugins.push(ProgressPlugin);

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build-dev", function (callback) {
    // modify some webpack config options
    var myConfig = require("./config/webpack.dev")();
    myConfig.plugins.push(ProgressPlugin);

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function () {
    // modify some webpack config options
    var myConfig = require("./config/webpack.dev")();
    myConfig.entry.main = ["webpack-dev-server/client?http://localhost:8080/",
        "webpack/hot/dev-server", myConfig.entry.main];
    myConfig.plugins.push(ProgressPlugin);
    myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        hot: true,
        proxy: {
            "**": "http://localhost:64508"
        },
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task("clean", function (cb) {
    var rimraf = require("rimraf");
    rimraf("{dist,compiled,dll}/**/*", cb);
});
