var webpack = require('webpack');
var webpack_config = require('./webpack.config');
var liveServer = require("live-server");

var compiler = webpack(webpack_config);

compiler.watch({
    aggregateTimeout: 300
}, function (err, stats) {
    if (err) console.err(err);
    //else console.log(stats);
});

var params = {
    // port: 8080, // Set the server port. Defaults to 8080.
    // host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "www/", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: '/www/data', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [['/node_modules', './node_modules']], // Mount a directory to a route.
    logLevel: 2 // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);
