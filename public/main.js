/**
 * require.config
 *
 * Defines configuration options for use in RequireJS
 *
 * @author Fernando Freire
 * @since 10/26/13
 */
require.config({
    baseUrl: 'public/js',
    paths: {
        'jquery':'vendor/jquery-2.0.3.min',
        'jquery-ui':'vendor/jquery-ui-1.10.3.custom.min',
        'async':'vendor/requirejs-lib/async',
        'knockout':'vendor/knockout-2.3.0.min',
        'foundation':'foundation/foundation', //TODO: Remove unused foundation
                                              //      js from project.
        'foundation-forms':'foundation/foundation.forms'
    },
    shim: {
        foundation: {
            exports: 'Foundation',
            deps: ['jquery']
        },
        'foundation-forms': {
            deps: ['foundation']
        }
    }
});


/**
 * main
 *
 * The main entry point for our application. Currently initializes
 * Foundation JS and Knockout ViewModels.
 *
 * @author Fernando Freire
 * @since 10/26/13
 */
define([
    'jquery',
    'knockout',
    'components/advt-form-dropdowns',
    'components/advt-form-data-builder',
    'components/request-builder',
    'viewmodels/SliderViewModel',
    'foundation',
    'foundation-forms',
    'components/advt-maps',
    'components/advt-mark',
    'foundation',
    'jquery-ui'
], function($, ko, formDropdowns, formDataBuilder, reqBuilder, SliderViewModel){

    $(document).ready(function() {
        // Initialize all form dropdowns.
        formDropdowns.initApplicationType($('#advt-application-type'));
        formDropdowns.initIntendedMajor($('#advt-intended-majors'));
        formDropdowns.initStateSelect($('#advt-state-select'));

        // Attach a listener on submit to the form.
        $('#advt-search-form').on('submit', function(el) {
            var data = formDataBuilder.build();
            reqBuilder.build(data);
            el.preventDefault();
        });

        // Attach a listener on click to the export button.
        $('.advt-export-button').on('click', function() {
            alert("This functionality has not yet been implemented.");
        });

        // Attach a listener on click to toggle the form display.
        $('#advt-form-collapse').on('click', function() {
            var toggleText = "";
            if ($(this).html() === "&lt;SHOW&gt;") {
                toggleText = "&lt;HIDE&gt;"
            } else {
                toggleText = "&lt;SHOW&gt;"
            }

            $(this).html(toggleText);
            $('.advt-collapse').toggle();
        });

        // Initialize Foundation 4 JS
        $(document).foundation();

        //Instantiate a new slider view model.
        ko.applyBindings(new SliderViewModel());
        // TODO: This is a hack and it should be fixed properly.
        $('#advt-gpa-min').val(0);
        $('#advt-gpa-max').val(4);
    });  //document.ready
});  //requirejs