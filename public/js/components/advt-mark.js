/**
 * advt-markers
 *
 * function that places markers on the map
 * based on a specifically formatted object that is passed in
 * @author Sam Golloway
 * @since 10/28/13
 *
 * @depends jquery, google,markers
 */
define([], function() {
	

	return {

		"init" : function(data, map) {
			geocoder = new google.maps.Geocoder();
			//function that creates a marker on Each specific address
			var createMarkers = function(highschool, map) {
				var ahh = 0;
				// geocode and create marker
				geocoder.geocode({
					'address' : highschool.address
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var marker = new google.maps.Marker({
							map : map,
							position : results[0].geometry.location,
							customInfo : highschool.name + " has " + highschool.students + " students that match the search"
						});
						// add a listener so we can check out sweet info
						google.maps.event.addListener(marker, 'click', function() {
							alert(this.customInfo);
						});
						
					} 
					
					else {
						//we tried to geocode to many addresses in a second. :( 
						if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
						{
							alert("too fast");
						}
						else
						{
							
							alert('Geocode was not successful for the following reason: ' + status);
						}
					}
						
					
				});
				
			};
			// loop trhough and create all the markers
			for (var i = 0; i < data.highschools.length; i++) {
				
			 
				createMarkers(data.highschools[i], map);
				
			}
		}
		
	};

});
