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

let options = commandLineArgs([
    { name: 'target', type: String, multiple: false, defaultOption: true }
]);

SystemJS.import(options.target).catch(err => {
    console.log(err);
});