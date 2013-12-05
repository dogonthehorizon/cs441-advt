
/**
 * advt-highschoolLayer.js
 *
 * this will aid in the creation of the highschool layer
 *
 * @author Sam Golloway
 * @since 11/26/13
 */

define(['Constants'], function(constants) {




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
	
	var whereString = "HighSchool IN (";
	var temp ="";
	zipWhere = "Zip IN ('"+zip+"')";
	
	this.FTLayer.setOptions({
				query: {
      			select: 'Address', 
     		    from: '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ',
     		    where: zipWhere
		        },styles: [{
  				markerOptions: {
   				 		iconName: "large_red"
  						}
				}]	
	});
	
	 google.maps.event.addListener(this.FTLayer, 'click',function(displayedArea) {
			// Get the necessary information from the clicked area

			var zip = displayedArea.row['Zip'].value;
			// display the highschools name
			var information = displayedArea.row['HighSchool'].value;
			displayedArea.infoWindowHtml = "High School Name : " + information;
		
		});
			
		this.FTLayer.setMap(constants.MAP);
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