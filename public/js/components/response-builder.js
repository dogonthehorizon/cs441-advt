                                   
/**
 * response-builder
 *
 * Receives a JSON array from the request-builder with data from the Fusion Table.
 * Cleans it up into a form palatable to layer.js.
 *
 * @author Aaron Dobbe
 * @since 11/13/13
 * @depends advt-markers
 */
define([
	'jquery',
    'components/advt-mark',
    'advtZipLayer',
    'components/advt-maps',
    'components/advt-highschoolLayer'
], function($, markers, advtZipLayer, maps,highSchoolLayer) {
    return {
        /**
          * build
          *
          * Converts data from request-builder into a response for advt-markers.
          *
          * @author Aaron Dobbe
          * @since 11/13/13
          */
        build: function(data, inCity, inState) {
            var response = {city: inCity, state: inState};

            // Now we need to convert the data to a clean HS array
            response.highschools = [];

            // loop through data and sort it by HS
			
			if (!data.rows) {
				alert("Your search returned no results. Please relax the filters and try again.");
				return;
			}
			
            for (var i=0; i < data.rows.length; i++) {
                var foundOne = false;
                var curName = data.rows[i][2];
                for (var j=0; j < response.highschools.length; j++) {
                    if (response.highschools[j].name === curName) {
                        response.highschools[j].students++;
                        foundOne = true;
                        break;
                    }
                }
                if (!foundOne) {
                    response.highschools.push({name: curName, address: data.rows[i][3], students: 1});
                }
            }
            // Send formatted response to the map layer!
			advtZipLayer.changeState.call(maps.zipLayer, $('#advt-state-select').val(),response.highschools);
			if(markers.isAllowed($('#advt-state-select').val())!="good" )
            {
            	console.log("attempt to make bad state Markers");
            	 markers.init(response);
            }
            else
            {
            	console.log(maps.zipLayer);
           		console.log(maps.highSchoolLayer);
            	var city = $('#advt-city-input').val();
            
            	if(city != "")
            	{
            		highSchoolLayer.changeCity.call(maps.highSchoolLayer, city,response);
            		 google.maps.event.addListener(highSchoolLayer, 'click', function(e) {
        			 alert("my BODY");
       					 });
           		 }
            	else
           		 {
            		highSchoolLayer.changeState.call(maps.highSchoolLayer, $('#advt-state-select').val(),response);
            		google.maps.event.addListener(highSchoolLayer, 'click', function(e) {
        			alert("my BODY");
       					 });
           		 }
            }
  
        }
    };
 });