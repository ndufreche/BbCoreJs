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
define(
    [
        'Core',
        'Core/Renderer',
        'BackBone',
        'jquery',
        'moment'
    ],
    function (Core, Renderer, Backbone, jQuery, moment) {
        'use strict';

        var DatetimepickerView = Backbone.View.extend({

            mainSelector: Core.get('wrapper_toolbar_selector'),

            initialize: function (template, formTag, element) {
                this.el = formTag;
                this.template = template;
                this.element = element;

                this.buildRenderValue();

                this.bindEvents();
            },

            buildRenderValue: function () {
                var value = this.element.getValue(),
                    timestamp;

                this.element.renderValue = '';
                if (value !== '') {
                    timestamp = moment.unix(value);
                    this.element.renderValue = timestamp.format('YYYY/MM/DD HH:mm');
                }
            },

            bindEvents: function () {
                var self = this;

                jQuery(this.mainSelector).on('click', 'form#' + this.el + ' input[name=' + this.element.getKey() + ']', jQuery.proxy(this.manageDatetimepicker, null, this));

                Core.Mediator.subscribe('before:form:submit', function (form) {
                    if (form.attr('id') === self.el) {
                        var element = form.find('.element_' + self.element.getKey()),
                            input = element.find('input[name="' + self.element.getKey() + '"]'),
                            span = element.find('span.updated'),
                            oldValue = self.element.value;

                        if (input.val() !== oldValue) {
                            span.text('updated');
                        } else {
                            span.text('');
                        }
                    }
                });
            },

            manageDatetimepicker: function (view) {
                var element = jQuery(this);

                element.datetimepicker({
                    parentID: view.mainSelector
                });

                element.datetimepicker('show');
            },

            /**
             * Render the template into the DOM with the Renderer
             * @returns {String} html
             */
            render: function () {
                return Renderer.render(this.template, {element: this.element});
            }
        });

        return DatetimepickerView;
    }
);
