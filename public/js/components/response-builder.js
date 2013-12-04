                                   
/**
 * response-builder
 *
 * Receives a JSON array from the request-builder with data from the Fusion Table.
 * Cleans it up into a form palatable to layer.js.
 *
 * @author Aaron Dobbe and Sam Golloway, Carl Lulay
 * @since 11/13/13
 * @depends advt-markers
 */
define([
	'jquery',
    'components/advt-mark',
    'components/advt-ziplayer',
    'components/advt-maps',
    'components/advt-highschoolLayer',
    'components/advt-getRightZips',

    'components/advt-util',
    'components/advt-results-pane-builder'
], function($, markers, advtZipLayer, maps,highSchoolLayer,getRightZips,util,resultsPane) {

	var createReqString = function(response)
	{
		var whereString = "HighSchool IN (";
		var temp ="";
		console.log(response.highschools);
		for(var i = 0; i < response.highschools.length; i++)
		{
			temp = response.highschools[i].name;
			whereString = whereString+"'"+temp+"', ";
		
		}
		var TABLE_ID = '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ';
		whereString = whereString +"'endString') ";
		var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
		var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Zip FROM "
                            + TABLE_ID + " WHERE ";
        reqString = reqString + whereString + key;
        return reqString;
	};
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
        
        	// make sure that the state is in the list of states we have accurate data for
			if(markers.isAllowed($('#advt-state-select').val())!="good" )
            {
                resultsPane.update([]);
            	markers.init(response);
            }
            else
            {
            	//grab the city they searched for
            	var city = util.toTitleCase($('#advt-city-input').val());
            	// make a querry for all possible zips in that city
            	if(city != "")
            	{
            			var whereString = "City IN (";
						var temp ="";
						var TABLE_ID = '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ';
						whereString = whereString +"'"+city+"') ";
						var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
						// selecting the zip
						var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Zip FROM "
                            + TABLE_ID + " WHERE ";
        				reqString = reqString + whereString + key;
        				// travel out and now find all the possible zips for the city
            			$.get(reqString,function(data){
            				var zips = [];
            				// push all the zips into an array
            				for(var i = 0; i < data.rows.length; i++)
            				{
            					zips.push(data.rows[i][0]);
            				}
            				// time to pick out the actual zips
            				getRightZips.getRightZips(zips,response,city);
            			});
            		 
           		 }
            	else
           		 {
            		var whereString = "State IN (";
						var temp ="";
						console.log($('#advt-state-select').val());
						var TABLE_ID = '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ';
						whereString = whereString +"'"+$('#advt-state-select').val()+"') ";
						var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
						var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Zip FROM "
                            + TABLE_ID + " WHERE ";
        				reqString = reqString + whereString + key;
            			$.get(reqString,function(data){
            				console.log(data);
            				var zips = [];
            				for(var i = 0; i < data.rows.length; i++)
            				{
            					zips.push(data.rows[i][0]);
            				}
            				getRightZips.getRightZipsStates(zips,response,$('#advt-state-select').val());
            			});
           		 }
            }
  

        }
    };
 });