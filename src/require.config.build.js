/*jslint unparam: true*/
/*
 * Copyright (c) 2011-2013 Lp digital system
 *
 * This file is part of BackBee.
 *
 * BackBee is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BackBee is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BackBee. If not, see <http://www.gnu.org/licenses/>.
 */
require.onResourceLoad = function (context, map) {
    "use strict";
    if (map.name === "jquery.noconflict") {
        require.undef(map.name);
    }
};
var baseURI = document.getElementById('bb5-ui').getAttribute('data-base-url') + "resources/toolbar/";
require.config({
    baseUrl: baseURI,
    catchError: true,
    waitSeconds: 15,
    paths: {
        'component': 'src/tb/component/component',
        'vendor': 'dist/vendor.min',
        'jquery.noconflict': 'src/core-jquery.noconflict',
        'ckeeditor': 'dist/ckeeditor/ckeditor'
    },
    'map': {
        "*": {
            'jquery': 'core-jquery'
        },
        'core-jquery': {
            'jquery': 'jquery'
        }
    },

    'shim': {
        'lib.jqtree': {
            deps: ['jquery.noconflict']

        },
        "core-jquery": {
            init: function () {
                "use strict";
                return window.$.noConflict(true);
            }
        },

        underscore: {
            exports: '_'
        },

        BackBone: {
            deps: ['underscore', 'jquery.noconflict'],
            exports: 'Backbone'
        },
        Core: {
            deps: ['BackBone', 'jquery.noconflict', 'jsclass', 'underscore', 'nunjucks', 'URIjs/URI']
        },
        'bootstrap-carousel': {
            deps: ['jquery.noconflict']
        },
        'bootstrap-dropdown': {
            deps: ['jquery.noconflict']
        },
        'jquery-layout': {
            deps: ['jquery.noconflict']
        },
        'cryptojs.core': {
            exports: 'CryptoJS'
        },
        'cryptojs.md5': {
            deps: ['cryptojs.core'],
            exports: 'CryptoJS'
        }
    },
    deps: ['src/tb/init'],
    callback: function (init) {
        'use strict';
        init.listen();
    }
});
