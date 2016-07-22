var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

function handler(percentage, msg) {
    gutil.log((percentage * 100).toFixed(2) + "%", msg);
}

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function () {
    gulp.watch(["src/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = require("./config/webpack.prod.js");
    myConfig.output.path = "wwwroot";
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.ProgressPlugin(handler)
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            errorDetails: true,
            cached: true,
            colors: true
        }));
        callback();
    });
});

// modify some webpack config options
var myDevConfig = require("./config/webpack.dev.js");
myDevConfig.output.path = "wwwroot";
myDevConfig.plugins = myDevConfig.plugins.concat(
    new webpack.ProgressPlugin(handler)
);

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function (callback) {
    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            errorDetails: true,
            cached: true,
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = require("./config/webpack.dev.js");
    myConfig.output.path = __dirname + "/wwwroot";
    myConfig.plugins = myConfig.plugins.concat(
		new webpack.ProgressPlugin(handler)
	);

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        contentBase: "src",
        stats: {
            //errorDetails: true,
            //cached: true,
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

var rimraf = require("rimraf");

gulp.task("clean", function (cb) {
    rimraf("{wwwroot,dist}/**/*", cb);
});
