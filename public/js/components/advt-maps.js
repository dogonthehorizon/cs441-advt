/**
 * advt-maps
 *
 * Initializes a Google Maps element that is applied to the page.
 * Note that you must first request an API key from:
 *      ffreire.fernando@gmail.com
 * or use your own API key before this module will function.
 *
 * @author Fernando Freire, Carl Lulay
 * @since 10/28/13
 *
 * @depends jquery, google
 */
define(['jquery', 
		'Constants',
		'advtZipLayer',
		'components/advt-highschoolLayer',
 		'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw&sensor=false!callback'
 		
 		], function($, constants, advtZipLayer,highschoolLayer) {
	var mapOptions = {
		zoom : 6,
		center : new google.maps.LatLng(45.5200, -122.6819),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	// Passing in a jQuery element yields errors since it
	// is returning a collection of DOM elements rather than
	// a single node. Since we know there is only one map-canvas
	// node on the page, we simply return the first element of
	// this collection.

	constants.MAP = new google.maps.Map($('#map-canvas')[0], mapOptions);

	var zipEID = '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU';
	//setting up the zip code layer
	var zipLayer = new advtZipLayer.zipLayer(new google.maps.FusionTablesLayer({
		query : {
			from : zipEID,
		}
	}), zipEID, constants.MAP);
	
	zipLayer.FTLayer.setMap(constants.MAP);
	var highSchoolLayer = new highschoolLayer.highSchoolLayer(new google.maps.FusionTablesLayer({
		query : {
			from : '1dbdd9haZtt2nt3OHsm1qW8bMmIMob24rJ709ErI'
		},
		
  				
	}));
	return{
		zipLayer:zipLayer,
		highSchoolLayer:highSchoolLayer
	};
});

