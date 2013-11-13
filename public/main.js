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
        'foundation':'foundation/foundation' //TODO: Remove unused foundation
                                             //      js from project.
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
    'viewmodels/SliderViewModel',
    'components/advt-maps',
    'components/advt-mark',
    'foundation',
    
    'jquery-ui'
], function($, ko, SliderViewModel,map,mark){
	
	
    $(document).foundation();
    ko.applyBindings(new SliderViewModel());
});