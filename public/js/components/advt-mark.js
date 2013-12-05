                                         
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
        
        'init' : function(data) {
        	studentTotal = 0;
        	getTotalStudents(data);
        	console.log(studentTotal);
            var Geocoder = new google.maps.Geocoder();
            //remove all the old markers on the screen;
         	
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
                            customInfo : highschool
                            
                        });
                        markers.push(Marker);

                        // Add a listener so we can check out sweet info.
                        google.maps.event.addListener(Marker, 'click', function() {
                        	//Fernando you can populat a window with this data
                        	console.log(this.customInfo);
                        	regionSchools =[];
                        	regionSchools.push(this.customInfo);
                        	resultsPane.update(regionSchools,0);
                           // alert(this.customInfo.name);
                        });

                    }//if

                    else {
                        // We tried to geocode too many addresses in a second. :(
                        if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        	// if we are making to many queries slow it down a bit
                            console.log("your search is causing a lot of pings to google. wait one moment please");
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

                var length = data.highschools[i].address.length;
				
				var address = data.highschools[i].address.substring(0,length-5);
				
				address = data.highschools[i].name +" "+ address;
				
				data.highschools[i].address = address+" "+data.highschools[i].zip;
				data.highschools[i].newaddress = data.highschools[i].name + " " + data.state + " " + data.highschools[i].zip;
				console.log("hey Listen");
				console.log(data.highschools[i].address);
				

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
