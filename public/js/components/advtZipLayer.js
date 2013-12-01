/**
 * advtZipLayer.js
 *
 * A collection of materials related to the zip code layer, including a method for changing the
 * state for which the zip codes are displayed, a constructor for a zipLayer object
 *
 * @author Carl Lulay
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
var changeState = function(state, schools) {
	console.log("changeState");
	//console.log(this.eID);
	console.log(schools);
	newEID = ZipTables[state];
	this.eID = newEID;
	
	//make sure we have the zip code data for the state we're searching in
	if(newEID!=undefined)
	{
		var zips = scrubZips(schools);
		//switch the table we're using to that of the new state
		 this.FTLayer.setOptions({
			 query : {
				 from : this.eID,
				 where : 'ZipCodeArea  IN (' + zips + ')'
			 }
		 });
	}
	else
	{
		console.log("no zip data");
	}
	 this.FTLayer.setMap(constants.MAP);
};

/* scrubZips(schools)
 *
 * takes in highschools and isolates their zip codes from their addresses
 *
 * @param the state to abbreviate
 *
 * @returns the zip codes for the highschools
 */
var scrubZips = function(schools){
	
	var zips = [];
	for (var i=0; i < schools.length; i++)
	{
		var lastDigit = schools[i].address.length;
		var firstDigit = lastDigit-5;
		var scrubbed = schools[i].address;
		zips.push(scrubbed.substr(firstDigit,5));
	}
	console.log(zips);
	return zips;
};


/* zipLayer constructor
 *
 * @param FTLayer the FusionTablesLayer we're applying.
 * @param eID The encrypted ID of the fusionTable that the zips are from.
 * @param map The map that the zipLayer is being applied to
 *
 * @returns void
 */
var zipLayer = function(FTLayer, eID, map) {
	this.FTLayer = FTLayer;
	this.eID = eID;
	this.map = map;
};//zipLayer



var ZipTables = {
		"AK" : "1FNPaWfRBUgGPugh0TJ5kHzs5W2E9ZdyrvNg91Ms", // TLC: 10/29.  Meyer et al.  California, Idaho, Alaska.  Working.
		"AZ" : "1b8vDRj6_8iPCjaIgpqy-ytX-VIgRLfW0BCpcKT8", // TLC: 10/27.  Mueller et al.  Working.
		"CA" : "1FNPaWfRBUgGPugh0TJ5kHzs5W2E9ZdyrvNg91Ms", // TLC: 10/29.  Meyer et al.  California, Idaho, Alaska.  Working.
		"CO" : "1pGyFVJ3u9C9jEQGpl_aba7r7uWiIVBDAUADFilM", // TLC: 10/27.  Gadbois et al.  Working.
		"HI" : "1aAd9SN0kmg7DtK1jhuh3M5C4y0OYihgdhS_Z6IA", // TLC: 10/27.  Mueller et al.  Working.
		"ID" : "1FNPaWfRBUgGPugh0TJ5kHzs5W2E9ZdyrvNg91Ms", // TLC: 10/27.  Meyer et al.  California, Idaho, Alaska.  Working.
		"IL" : "1cKRKxLql_yySfS0VKJR8l3FRnv9QYmO5hnvv3Cs", // TLC: 10/27.  Gadbois et al.  Working.
		"ME" : "11t_bjHCP5fSU1YdUjcPwnjT8TKsaYxmpmkKs9tk", // TLC: 10/27.  Garcia et al.   Working.
		"MN" : "1pkW7EOA4TaoLrR637OeKsR4_WG2EERyqRhSMKJs", // TLC: 10/29.  Meyer et al.  Oregon and Minnesota.
		"NE" : "168QyhgFvpITQmKeXdQ3NQSNkgDC55T4B1PUJKhk", // TLC: 10/27.  Gadbois et al.  Working.
		"NM" : "1bFE-rO_gsHyDp7e5yKUirHKL5qv3KU6wLKJk_kE", // TLC: 10/27.  Mueller et al.  Working.
		"NV" : "1NIpIVPjf8n-ZCEWnZoLl3uCJApMvOukFrYzdCZ0", // TLC: 10/27.  Garcia et al.   Working.
		"NY" : "1fPNF_U6oLbIresIP7azTx60-_z2yPa7MXmQJ3OM", // TLC: 10/27.  Mueller et al.  Working.
		"OR" : "1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU", // TLC: 10/27.  Crenshaw.       Working.
		"TX" : "1VM5jgrP_ROg5kFcTpwpJuw-fDpgvaSeQ4JAgEvw", // TLC: 10/27.  Garcia et al.   Working.
		"UT" : "1ImtKIQYOTlEFgy1oLF8WeygB3antpx8Nx-qwQYU", // TLC: 10/27.  Gadbois et al.  Working.
		"WA" : "1jNwC6KeDC3NnVlReslJZB8VvujKjyxQhDs7o5Tc", // TLC: 10/27.  Garcia et al.   Working.
};


return {
	  	changeState: changeState,
   		zipLayer : zipLayer,
   };

});