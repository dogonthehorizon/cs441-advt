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
    'viewmodels/SliderViewModel',
    'foundation',
    'foundation-forms',
    'components/advt-maps',
    'jquery-ui'
], function($, ko, formDropdowns, formDataBuilder, SliderViewModel){

    $(document).ready(function(){
        formDropdowns.initApplicationType($('#advt-application-type'));
        formDropdowns.initIntendedMajor($('#advt-intended-majors'));

        $('#advt-search-form').on('submit', function(el) {
            var data = formDataBuilder.build();
            console.log(data);
            el.preventDefault();
        });

        $(document).foundation();
        ko.applyBindings(new SliderViewModel());
        // TODO: This is a hack and it should be fixed properly.
        $('#advt-gpa-min').val(0);
        $('#advt-gpa-max').val(4);
    });  //document.ready
});  //requirejs