                                   
/**
 * advt-getRightZip
 *
 *
 * 
 * @author Sam Golloway
 * @since 12/1/13
 * @depends advt-markers
 * @depends jquery
 * @depends advtZipLayer
 * @depends advt-maps
 * 
 */
define([
	'jquery',
    'components/advt-mark',
    'components/advt-ziplayer',
    'components/advt-maps',
], function($, markers, advtZipLayer, maps) {
	
	                          
/**
 * getRightZips
 * Description: gets the proper zips if a particular city was searched for
 * @author Sam Golloway
 * @since 12/1/13
 * @param Zips: legitimate highschool zips retrieved from response builder
 * @param response:The almost complete response gathered by the resposne builder
 * @param city: The city that was searched for on the form
 */
	var getRightZips = function(zips,response,city)
	{
		// need to grab all highschools that are in the city
		var whereString = "City IN (";
		var temp ="";		
		var TABLE_ID = '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ';
		whereString = whereString +"'"+city+"') ";
		var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
		// selecting the highschool
		var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT HighSchool FROM "
                            + TABLE_ID + " WHERE ";
        reqString = reqString + whereString + key;
        $.get(reqString, function(data)
        {
        	//build an array of all the names
        	var names = [];
            for(var i = 0; i < data.rows.length; i++)
            {
            	names.push(data.rows[i][0]);
            }
            //find names that match and record zips
            var realZips =[];
            var newResponse = [];
            // now to compare the names of the highschools that are actually in the
            // city versus all the ones that the reponse got
            // once an actual highschool is found grab its zip and start building an array
            // of legitimate zipcodes
            // also creating a new list of responses to match what should be in city
            for( var i = 0; i< names.length; i++)
            {
            	for(var v = 0; v < response.highschools.length; v++)
            	{
            		
            		if(names[i].toLowerCase() === response.highschools[v].name.toLowerCase())
            		{
            			
            			//attach the real zip to the school
            			response.highschools[v].zip = zips[i];
            			//push the new confirmed response onto the array of new responses
            			newResponse.push(response.highschools[v]);
            			//add the legit zip to the array of zipcodes
            			realZips.push(zips[i]);
            		}
            	}
            }
             newResponse.state = response.state;
             newResponse.city = response.city;
            advtZipLayer.changeState.call(maps.zipLayer, $('#advt-state-select').val(),response.highschools,realZips,newResponse);
            
        });
		
	};
/**
 * getRightZips
 * Description: gets the correct zips if an entire state was searched for
 * @author Sam Golloway
 * @since 12/1/13
 * @param Zips: legitimate highschool zips retrieved from response builder
 * @param response:The almost complete response gathered by the resposne builder
 * @param city: The city that was searched for on the form
 */
	var getRightZipsStates = function(zips, response, state){
		var whereString = "State IN (";
		var temp ="";
						
		var TABLE_ID = '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ';
		whereString = whereString +"'"+state+"') ";
		var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
		// select from the highschool
		var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT HighSchool FROM "
                            + TABLE_ID + " WHERE ";
        reqString = reqString + whereString + key;
        $.get(reqString, function(data)
        {
        	var names = [];
            for(var i = 0; i < data.rows.length; i++)
            {
            	names.push(data.rows[i][0]);
            }
            //find names that match and record zips
            var realZips =[];
            var newResponse = [];
            // now to compare the names of the highschools that are actually in the
            // State versus all the ones that the reponse got
            // once an actual highschool is found grab its zip and start building an array
            // of legitimate zipcodes
            // also creating a new list of responses to match what should be in state
           for( var i = 0; i< names.length; i++)
            {
            	for(var v = 0; v < response.highschools.length; v++)
            	{
            		
            		if(names[i].toLowerCase() === response.highschools[v].name.toLowerCase())
            		{
            			
            			//attach the real zip to the school
            			response.highschools[v].zip = zips[i];
            			//push the new confirmed response onto the array of new responses
            			newResponse.push(response.highschools[v]);
            			//add the legit zip to the array of zipcodes
            			realZips.push(zips[i]);
            		}
            	}
            }
            newResponse.state = response.state;
            newResponse.city = response.city;
          
            //we can finally create the layer
            advtZipLayer.changeState.call(maps.zipLayer, $('#advt-state-select').val(),response.highschools,realZips,newResponse);
    
        });

		
	};
    return {
    		getRightZips:getRightZips,
    		getRightZipsStates:getRightZipsStates
      };
       
            
 });