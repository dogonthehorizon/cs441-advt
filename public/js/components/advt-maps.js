/**
 * advt-maps
 *
 * Initializes a Google Maps element that is applied to the page.
 * Note that you must first request an API key from:
 *      ffreire.fernando@gmail.com
 * or use your own API key before this module will function.
 *
 * @author Fernando Freire
 * @since 10/28/13
 *
 * @depends jquery, google
 */
define([
    'jquery',
    // Google Maps API -- This is loaded asynchronously to function better with RequireJS
    'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyC0pm2UlX-jV6E4CLy-a4BgWEPLI40-qwU&sensor=false!callback'
], function($){
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(45.5200, -122.6819),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Passing in a jQuery element yields errors since it
    // is returning a collection of DOM elements rather than
    // a single node. Since we know there is only one map-canvas
    // node on the page, we simply return the first element of
    // this collection.
    return new google.maps.Map($('#map-canvas')[0], mapOptions);
});
