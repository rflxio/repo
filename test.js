let fs = require('fs');
let path = require('path');
let Jasmine = require('jasmine');
let JasmineConsoleReporter = require('jasmine-console-reporter');

let SystemJS = require('systemjs');
let commandLineArgs = require('command-line-args');

SystemJS.config({
    transpiler: 'typescript',
    defaultJSExtensions: false,

    map: {
        // ------ system modules ------
        "console": "@node/console",
        "buffer": "@node/buffer",
        "querystring": "@node/querystring",
        "events": "@node/events",
        "http": "@node/http",
        "cluster": "@node/cluster",
        "zlib": "@node/zlib",
        "os": "@node/os",
        "https": "@node/https",
        "punycode": "@node/punycode",
        "repl": "@node/repl",
        "readline": "@node/readline",
        "vm": "@node/vm",
        "child_process": "@node/child_process",
        "url": "@node/url",
        "dns": "@node/dns",
        "net": "@node/net",
        "dgram": "@node/dgram",
        "fs": "@node/fs",
        "path": "@node/path",
        "string_decoder": "@node/string_decoder",
        "tls": "@node/tls",
        "crypto": "@node/crypto",
        "stream": "@node/stream",
        "util": "@node/util",
        "assert": "@node/assert",
        "tty": "@node/tty",
        "domain": "@node/domain",
        "constants": "@node/constants",

        // ------ common modules ------
        "systemjs": "@node/systemjs",
        "jasmine-console-reporter": "@node/jasmine-console-reporter",

        // ------ SystemJS configuration ------
        json: './node_modules/systemjs-plugin-json/json.js'

    },
    meta: {
        '*.json': {
            loader: 'json'
        }
    },

    paths: {
        'typescript': './node_modules/typescript'
    },

    packages: {
        'typescript': {
            main: 'lib/typescript'
        },

        'server': {
            defaultExtension: 'ts'
        },

        'tests': {
            defaultExtension: 'ts'
        }
    },

    typescriptOptions: require('./tsconfig.json')
});

let jasmine = new Jasmine();

let reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

jasmine.addReporter(reporter);

let jasmineModule = Object.assign({ jasmine: jasmine.jasmine }, jasmine.env);

SystemJS.set('jasmine', SystemJS.newModule(jasmineModule));

let rootPath = process.cwd();
let serverPath = path.join(rootPath, 'server');

walk(serverPath, (err, values) => {
    if (err) {
        throw err;
    } else {
        promises = values
            .filter((item) => item.endsWith('.test.ts'))
            .map(item => item.replace(rootPath, '.'))
            .map((path) => SystemJS.import(path));

        Promise.all(promises).then(() => {
            jasmine.execute();
        }, (err) => {
            console.log(err);
        });
    }
});

function walk(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, files) {
        if (err) return done(err);
        let pending = files.length;
        if (!pending) return done(null, results);

        files.forEach(function(file) {
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);

                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
}
