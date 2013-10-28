/**
 * SliderViewModel
 *
 * Initializes and observes double-slider UI elements.
 *
 * @author Fernando Freire
 * @since 10/28/13
 *
 * @depends jquery, knockout
 *
 */
define([
    'jquery',
    'knockout'
], function($, ko){
    ko.bindingHandlers.slider = {

        //Initialize the UI element.
        init: function(element, valueAccessor, allBindingsAccessor) {

            // Get the slider options from the DOM node we are attaching to,
            // otherwise init some default options.
            var options = allBindingsAccessor().sliderOptions || {};

            // Init the UI element.
            $(element).slider(options);

            // Make the slider values observable
            ko.utils.registerEventHandler(element, 'slide', function(event, ui) {
                var observable = valueAccessor();
                observable($(element).slider('values'));
            });

            // Make sure we dispose of KO elements properly.
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).slider('destroy');
            });



        },

        // Update the values as needed.
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            // Throw away any values that are not numbers.
            if(isNaN(value)) { value = 0; }

            $(element).slider('value', value);
        }
    };

    // Return the ViewModel, which we will initialize in main.js
    return function() {
        var self = this;

        self.satReading = ko.observableArray([0,800]); //TODO: This should be moved into a constant or something.
        self.satMath    = ko.observableArray([0,800]); //TODO: This should be moved into a constant or something.
        self.GPA        = ko.observableArray([0,800]); //TODO: This should be moved into a constant or something.

    };
});