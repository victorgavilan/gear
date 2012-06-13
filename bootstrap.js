/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*
 * Bootstraps browser based Gear.js
 */
var path = require('path'),
    gear = require(path.join(process.cwd(), 'index'));

var namespace = '' + //"use strict";\n' +
                'var gear = gear || {};\n' +
                'gear.tasks = gear.tasks || {};\n' +
                'gear.vendor = gear.vendor || {};\n';

var files = [
    'vendor/async.js',
    'lib/blob.js',
    'lib/tasks/concat.js',
    'lib/tasks/core.js',
    'lib/tasks/read.js',
    'lib/tasks/tasks.js',
    'lib/tasks/write.js',
    'lib/registry.js',
    'lib/queue.js'
];

new gear.Queue({registry: new gear.Registry({module: 'gear-lib'})})
    .load(namespace)
    .read(files)
    .jslint({nomen: true, sloppy: true, white: true, vars: true, callback: function(blob) {
        console.log(blob.name ? blob.name : 'inline', blob.jslint);
    }})
    .concat()
    .tasks({
        dev:     {task: ['write', 'build/gear.js']},
        prodmin: {task: 'jsminify'},
        prod:    {requires: 'prodmin', task: ['write', 'build/gear.min.js']},
        join:    {requires: ['dev', 'prod']}
    })
    .run(function(err, results) {
        if (err) {
            console.error(err);
        }
    });