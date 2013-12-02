                                          
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
 * @param the state to display
 *
 * @returns void
 */
var changeState = function(state,data) {
	this.schoolInfo = data.highschools[0].name;
	console.log(this.eID);
	console.log("halp");
	//var stateAbrv = abbreviation(state);
	console.log(state);
	state = "State IN ('"+state+"')";
	console.log(state);
	this.FTLayer.setOptions({
				query: {
      			select: 'Address', 
     		    from: '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ',
     		    where: state
		}
	});
	this.FTLayer.setMap(constants.MAP);
};
var changeCity = function(city,data) {
	this.schoolInfo = data.highschools[0].name;
	console.log(this.eID);
	console.log("halp");
	//var stateAbrv = abbreviation(state);
	console.log(city);
	city = "City IN ('"+city+"')";
	console.log(city);
	this.FTLayer.setOptions({
				query: {
      			select: 'Address', 
     		    from: '1rYG3k8Ac7mo2thTVcMm5fgRLwP9uCnQTmyRcEtQ',
     		    where: city
		},styles: [{
  				markerOptions: {
   				 		iconName: "large_green"
  						}
				}]
  				
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