                                                                     
                                                                     
                                                                     
                                             
/**
 * advt-markers
 *
 * function that places markers on the map
 * based on a specifically formatted object that is passed in.
 *
 * @author Sam Golloway, Carl Lulay, Fernando Freire
 * @since 10/28/13
 *
 * @depends jQuery, Google Maps
 */
define([
	'Constants'
	], function(constants) {
	var schoolInfo = [];
	var isAllowed= function(state){
		var stateAbrv = {
		"AK":"good",
		"AZ":"good",
		"CA":"good",
		"CO":"good",
		"HI":"good",
		"WA":"good",
		"IL":"good",
	    "ME":"good",
		"MN":"good",
		"NE":"good",
		"NM":"good",
		"NY":"good",
		"NV":"good",
		"OR":"good",
		"TX":"good",
		"UT":"good",
		
		};
		return stateAbrv[state];
};


		
	
    return {

        /**
         * init
         *
         * TODO: function definition goes here.
         *
         * @author Sam Golloway, Carl Lulay
         *
         * @param data
         * @param map
         */
        
        'init' : function(data) {
        	
            var Geocoder = new google.maps.Geocoder();
			
            // Function that creates a marker on each specific address.
            var createMarkers = function(highschool, map) {
				
				console.log(highschool.name);
                // Geocode and create marker.
                Geocoder.geocode({

                    'address' : highschool.newaddress

                }, function(results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        var Marker = new google.maps.Marker({
                            map : map,
                            position : results[0].geometry.location,
                            customInfo : highschool.name + " has " + highschool.students + " students that match the search "+highschool.address  
                        });

                        // Add a listener so we can check out sweet info.
                        google.maps.event.addListener(Marker, 'click', function() {
                            alert(this.customInfo);
                        });

                    }//if

                    else {
                        // We tried to geocode too many addresses in a second. :(
                        if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            console.log("your search is causing a lot of pings to google. wait one moment please");
                          //  setTimeout(function(){createMarkers(highschool,constants.MAP);},5000);
                        }
                        else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    }//else


                });//Geocoder.geocode
            };//createMarkers

           
			console.log(data);
			
			// clean up the addresses
			 for (var i = 0; i < data.highschools.length; i++) {

                var length = data.highschools[i].address.length;
				
				var address = data.highschools[i].address.substring(0,length-5);
				
				address = data.highschools[i].name +" "+ address;
				
				data.highschools[i].newaddress = address;
				

            }//for
             // Loop through and create all the markers.
            for (var i = 0; i < data.highschools.length; i++) {
				
                createMarkers(data.highschools[i], constants.MAP);

            }//for
           alert("done");
        },//init
        isAllowed:isAllowed,
        schoolInfo:schoolInfo

    };
});
