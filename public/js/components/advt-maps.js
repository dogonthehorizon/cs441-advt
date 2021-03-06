/**
 * advt-maps
 *
 * Initializes a Google Maps element that is applied to the page.
 * Note that you must first request an API key from:
 *      ffreire.fernando@gmail.com
 * or use your own API key before this module will function.
 *
 * @author Fernando Freire, Carl Lulay
 * @since 28 Oct. 2013
 *
 * @depends jquery, google
 */
define(['jquery', 
		'Constants',
		'components/advt-ziplayer',
		'components/advt-highschoolLayer',
		'components/advt-mark',
 		'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw&sensor=false!callback'
 		

], function($, constants, advtZipLayer, highschoolLayer) {

	// Passing in a jQuery element yields errors since it
	// is returning a collection of DOM elements rather than
	// a single node. Since we know there is only one map-canvas
	// node on the page, we simply return the first element of
	// this collection.
	
	var setCenter = function(city,state)
	{
	    var Geocoder = new google.maps.Geocoder();
		if(city!="")
		{
			var address = city+", "+state;
			constants.MAP.setZoom(9);
		}
		else
		{
			var address = state;
			constants.MAP.setZoom(6);
		}
			 Geocoder.geocode({

                    'address' : address

                }, function(results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        
                           constants.MAP.setCenter(results[0].geometry.location);
                               
                       
		            }
		             });
		 
	}; 
	var mapOptions = {
		zoom : 6,
		center : new google.maps.LatLng(45.5200, -122.6819),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	constants.MAP = new google.maps.Map($('#map-canvas')[0], mapOptions);

	
	//setting up the zip code layer
	var zipLayer = new advtZipLayer.zipLayer(new google.maps.FusionTablesLayer, "zipEID", constants.MAP);

	//zipLayer.FTLayer.setMap(constants.MAP);
	//add an event listener for clicks - for now all this does is display the zip code in a popup



	return{
		zipLayer:zipLayer,
		setCenter:setCenter

		//highSchoolLayer:highSchoolLayer,
};
});

