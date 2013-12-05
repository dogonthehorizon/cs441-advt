
/**
 * advt-highschoolLayer.js
 *
 * this will aid in the creation of the highschool layer
 *
 * @author Sam Golloway
 * @since 11/26/13
 */

define(['Constants','jquery'], function(constants,$) {




/* changeState(state)
 *
 * changes the state for which the zip codes are being displayed
 *
 * @param State: the state in which the markers are in
 *
 * @returns void
 * 
 * DEPRICATED???
 */
changeState = function(state) {
	
	state = "State IN ('"+state+"')";
	//console.log(state);
	this.FTLayer.setOptions({
				query: {
      			select: 'Address', 
     		    from: '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ',
     		    where: state
		}
	});
	this.FTLayer.setMap(constants.MAP);
};
/* changeState(state)
 *
 * changes the zipcode for the markers for which the zip codes are being displayed
 *
 * @param zip: the zipCode for the highschool to be displayed
 *
 * @returns void
 */
var changeCity = function(zip) {
	
	console.log("i want to hang out too guys");
	console.log(zip);
	
	var temp ="";
	var zipWhere = "Zip IN ('"+zip+"')";
	
		var whereString = "Zip IN (";
		var temp ="";
						
		var TABLE_ID = '1dbdd9haZtt2nt3OHsm1qW8bMmIMob24rJ709ErI';
		whereString = whereString +"'"+zip+"')";
		var key = "&key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw";
		// select from the highschool
		var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT Address FROM "
                            + TABLE_ID + " WHERE ";
            reqString = reqString+whereString+key;
        $.get(reqString,function(data){console.log(data);});
	
	
	
	
	this.FTLayer.setOptions({
				query: {
      			select: 'Address', 
     		    from: '1dbdd9haZtt2nt3OHsm1qW8bMmIMob24rJ709ErI',
     		    where: zipWhere
		        },styles: [{
  				markerOptions: {
   				 		iconName: "large_green"
  						}
				}]	
	});
	this.FTLayer.setMap(constants.MAP);
	 google.maps.event.addListener(this.FTLayer, 'click',function(displayedArea) {
			// Get the necessary information from the clicked area

			var zip = displayedArea.row['Zip'].value;
			// display the highschools name
			var information = displayedArea.row['HighSchool'].value;
			displayedArea.infoWindowHtml = "High School Name : " + information;
		
		});
			
		
};
/* abbreviation(state)
 *
 * returns the 2 letter state abbreviation
 *
 * @param the state to abbreviate
 *
 * @returns 2 letter state abbreviation
 */
var abbreviation = function(state){
		return stateAbrv[state];
};


/* zipLayer constructor
 *
 * @param FTLayer the FusionTablesLayer we're applying.
 * @param eID The encrypted ID of the fusionTable that the zips are from.
 * @param map The map that the zipLayer is being applied to
 *
 * @returns void
 */
var highSchoolLayer = function(FTLayer) {
	this.FTLayer = FTLayer;
};//zipLayer




return {
	  	changeState: changeState,
   		highSchoolLayer : highSchoolLayer,
   		changeCity: changeCity
   };

});