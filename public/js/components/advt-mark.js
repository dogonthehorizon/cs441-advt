                                         
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
	'jquery',
	'Constants',
	'components/advt-results-pane-builder',
	], function($,constants,resultsPane) {

	var schoolInfo = [];
	var markers = [];
	var timeOutFunctions =[];
	var studentTotal = 0;
	var removeMarkers = function()
	{
		if(markers.length>0)
         	{
         		for(var i = 0; i < markers.length; i++)
         		{
         			markers[i].setMap(null);
         		}
         		markers = [];
         	}
	};
	var clearTimeOuts = function()
	{
		for (var i=0;i<timeOutFunctions.length;i++)
			{ 
					clearTimeout(timeOutFunctions[i]);
			}
	};
	var getTotalStudents = function(data)
	{
		for (var i = 0; i < data.highschools.length; i++) {
				
               studentTotal += data.highschools[i].students;

            }//for
		
	};
	
/*
 * 
 * @param state: check to see if we have data for a state return good if yes
 * 
 * 
 */
	var isAllowed= function(state){
		var stateAbrv = {
		"AZ":"good",
		"CA":"good",
		"CO":"good",
		"HI":"good",
		"IL":"good",
		"NE":"good",
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
         * @author Sam Golloway
         *
         * @param data
         * @param map
         */
        
        'init' : function(data,total) {
        	studentTotal = 0;
        	getTotalStudents(data);
        	
            var Geocoder = new google.maps.Geocoder();
            //remove all the old markers on the screen;
         	
            // Function that creates a marker on each specific address.
            var createMarkers = function(highschool, map) {
				
				
                // Geocode and create marker.
                Geocoder.geocode({

                    'address' : highschool.newaddress

                }, function(results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        var Marker = new google.maps.Marker({
                            map : map,
                            position : results[0].geometry.location,
                            customInfo : highschool
                            
                        });
                        markers.push(Marker);

                        // Add a listener so we can check out sweet info.
                        google.maps.event.addListener(Marker, 'click', function() {
                        	//Fernando you can populat a window with this data
                        	
                        	regionSchools =[];
                        	regionSchools.push(this.customInfo);
                        	if(total>0)
                        	{
                        		studentTotal = total;
                        	}
                        	resultsPane.update(regionSchools,studentTotal);
                           // alert(this.customInfo.name);
                        });

                    }//if

                    else {
                        // We tried to geocode too many addresses in a second. :(
                        if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        	// if we are making to many queries slow it down a bit
                         
                           var timeOutFunc = setTimeout(function(){createMarkers(highschool,constants.MAP);},3000);
                         timeOutFunctions.push(timeOutFunc);
                        }
                        else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    }//else


                });//Geocoder.geocode
            };//createMarkers

           
			

			// clean up the addresses
			 for (var i = 0; i < data.highschools.length; i++) {
				
				//depending on the information we may not have proper zip codes
				//if we don't then just use the city and state to find the address
				if(data.highschools[i].zip === undefined)
				{
					data.highschools[i].newaddress = data.highschools[i].name +" " + data.city+ ", " + data.state;
				}
				else
				{
					data.highschools[i].newaddress = data.highschools[i].name +" " + data.city+ ", " + data.state + " " + data.highschools[i].zip;
				}
            }//for
             // Loop through and create all the markers.
            for (var i = 0; i < data.highschools.length; i++) {
				
                createMarkers(data.highschools[i], constants.MAP);

            }//for
       
        },//init

        isAllowed:isAllowed,
        schoolInfo:schoolInfo,
        timeOutFunctions:timeOutFunctions,
        removeMarkers:removeMarkers,
        clearTimeOuts:clearTimeOuts


    };
});
