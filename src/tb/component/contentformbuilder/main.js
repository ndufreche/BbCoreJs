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

require.config({
    paths: {
        //Elements
        'cf.edition.elements': 'src/tb/component/contentformbuilder/elements',

        'ElementInterpreter': 'src/tb/component/contentformbuilder/ElementInterpreter'
    }
});

define(
    [
        'require',
        'jquery',
        'Core',
        'Core/Utils',
        'jsclass'
    ],
    function (require, jQuery) {
        'use strict';

        var Utils = require('Core/Utils');

        return {
            getConfig: function (classname, object) {

                var dfd = jQuery.Deferred();

                Utils.requireWithPromise(['ElementInterpreter!' + classname]).done(function (element) {

                    if (element !== null) {
                        element.getConfig(object).done(function (config) {
                            dfd.resolve(config);
                        });
                    } else {
                        dfd.resolve(null);
                    }
                });

                return dfd.promise();
            }
        };
    }
);