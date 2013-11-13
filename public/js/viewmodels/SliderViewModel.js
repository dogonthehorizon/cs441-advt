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
    'knockout',
    'Constants'
], function($, ko, Constants){
    ko.bindingHandlers.slider = {

        //Initialize the UI element.
        init: function(element, valueAccessor, allBindingsAccessor) {

            // Get the slider options from the DOM node we are attaching to,
            // otherwise init some default options.
            var options = allBindingsAccessor().sliderOptions || {};

            // Init the UI element.
            $(element).slider(options);

            ko.utils.registerEventHandler(element, "slidechange", function() {
                var observable = valueAccessor();
                observable($(element).slider('values'));
            });

            // Make the slider values observable
            ko.utils.registerEventHandler(element, 'slide', function() {
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

        self.satReading = ko.observableArray([Constants.SAT_MIN, Constants.SAT_MAX]);
        self.satMath    = ko.observableArray([Constants.SAT_MIN, Constants.SAT_MAX]);
        self.GPA        = ko.observableArray([Constants.GPA_MIN, Constants.GPA_MAX]);

    };
});