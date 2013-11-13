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
define([], function() {

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
        'init' : function(data, map) {
            var Geocoder = new google.maps.Geocoder();

            // Function that creates a marker on each specific address.
            var createMarkers = function(highschool, map) {

                // Geocode and create marker.
                Geocoder.geocode({

                    'address' : highschool.address

                }, function(results, status) {

                    if (status === google.maps.GeocoderStatus.OK) {
                        var Marker = new google.maps.Marker({
                            map : map,
                            position : results[0].geometry.location,
                            customInfo : highschool.name + " has " + highschool.students + " students that match the search"
                        });

                        // Add a listener so we can check out sweet info.
                        google.maps.event.addListener(Marker, 'click', function() {
                            alert(this.customInfo);
                        });

                    }//if

                    else {
                        // We tried to geocode too many addresses in a second. :(
                        if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            alert("your search is causing a lot of pings to google. wait one moment please");
                            
                            createMarkers(highschool,map);
                          
                        }
                        else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    }//else


                });//Geocoder.geocode
            };//createMarkers

            // Loop through and create all the markers.
            for (var i = 0; i < data.highschools.length; i++) {

                createMarkers(data.highschools[i], map);

            }//for
        }//init

    };
});

