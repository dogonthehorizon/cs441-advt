/**
 * advtZipLayer.js
 *
 * A collection of materials related to the zip code layer, including a method for changing the
 * state for which the zip codes are displayed, a constructor for a zipLayer object
 *
 * @author Carl Lulay and Sam Golloway
 * @since 11/26/13
 */

define(['jquery', 'Constants', 'components/advt-highschoolLayer', 'components/advt-mark', 'components/advt-results-pane-builder', 'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw&sensor=false!callback'], function($, constants, highschoolLayer, markers, resultsPane) {

	var highSchoolLayer = new highschoolLayer.highSchoolLayer(new google.maps.FusionTablesLayer);

	/* changeState(state)
	 *
	 * changes the state for which the zip codes are being displayed
	 *
	 * @param the state to display
	 * @param schools: the array of schools gathered by the response builder
	 * @param zips: the zipcodes to be displayed
	 * @param response: the new clean set of responses
	 * @returns void
	 */
	var changeState = function(state, schools, zip, response) {

		newEID = ZipTables[state];
		this.eID = newEID;
		//make sure we have the zip code data for the state we're searching in
		if (newEID != undefined) {
			var zips = scrubZips(schools);
			
			this.FTLayer.setOptions({
				query : {
					//switch the table we're using to that of the new state
					from : this.eID,
				},
				//recolor the zip codes based on how many students are in them
				styles : [{
					where : 'ZipCodeArea  IN (' + zips.zip0 + ')',
					polygonOptions : {
						fillColor : "#FFFFFF",
						fillOpacity : 0
					}},{
					where : 'ZipCodeArea  IN (' + zips.zip1 + ')',
					polygonOptions : {
						fillColor : "#330033",
						fillOpacity : 0.9
					}},{
					where : 'ZipCodeArea  IN (' + zips.zip2 + ')',
					polygonOptions : {
						fillColor : "#660066",
						fillOpacity : 0.9
					}},{
					where : 'ZipCodeArea  IN (' + zips.zip3 + ')',
					polygonOptions : {
						fillColor : "#990099",
						fillOpacity : 0.9
					}},{
					where : 'ZipCodeArea  IN (' + zips.zip4 + ')',
					polygonOptions : {
						fillColor : "#CC00CC",
						fillOpacity : 0.9
					}},{
					where : 'ZipCodeArea  IN (' + zips.zip5 + ')',
					polygonOptions : {
						fillColor : "#FF00FF",
						fillOpacity : 0.9
					}}]
			});
		} else {
			console.log("no zip data");
			alert("We do not have sufficient data to completele your search\n" + "accurately we will make our best guess. This could take awhile ");
			markers.init(response);

		}
		//add an event listener for clicks - for now all this does is display the zip code in a popup
		google.maps.event.addListener(this.FTLayer, 'click', function(displayedArea) {

			var information = displayedArea.row['ZipCodeArea'].value;
			var regionSchools = [];
			for (var i = 0; i < response.length; i++) {
				if (information === response[i].zip) {
					// Get the necessary information from the clicked area
					//********* FEEEEERRRRRRRRNNNNNNAAAAAANNNNNDOOOOOOOO
					// call your thing here
					// EACH response[i] is a highschool object that should be
					// displayed
					console.log(response[i]);
					regionSchools.push(response[i]);
				}
			}

			resultsPane.update(regionSchools);

			//dipslay the zipcode for the given out line and throw down markers for the map
			displayedArea.infoWindowHtml = "ZIP Code: " + information;
			highschoolLayer.changeCity.call(highSchoolLayer, information);
		});
		this.FTLayer.setMap(constants.MAP);

	};

	/* scrubZips(schools)
	 *
	 * takes in highschools and isolates their zip codes from their addresses
	 *
	 * @param the list of schools we're grabbing the zips from
	 *
	 * @returns the 5 sorted arrays of zip codes for the highschools
	 */

	var scrubZips = function(schools) {

		var allZips = [];
		var studentsInZipCodes = [];

		//a quick helper function to check if an array contains an item
		var contains = function(array, item) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === item) {
					return true;
				}
			}
			return false;
		};

		//go through the list of schools and scrub the zip codes. Keep track of the
		//number of students in each zip code so that we can then sort the zip codes
		//by passing them into sortZips()
		for (var i = 0; i < schools.length; i++) {
			var lastDigit = schools[i].address.length;
			var firstDigit = lastDigit - 5;
			var scrubbed = schools[i].address.substr(firstDigit, 5);
			if (!contains(allZips, scrubbed)) {
				allZips.push(scrubbed);
				studentsInZipCodes[scrubbed] = schools[i].students;
			} else {
				studentsInZipCodes[scrubbed] += schools[i].students;
			}
		}

		return sortZips(studentsInZipCodes);
	};

	/*
	 * sortZips(zips)
	 *
	 * takes in an array of zip codes and students and returns 5 arrays holding different ranges of students
	 *
	 * @param an array of numbers. The index of the entry is the zip code, the value is the number of students
	 *
	 * @return the 6 sorted arrays of zip codes
	 */
	var sortZips = function(zips) {
		var zip0 = [];
		var zip1 = [];
		var zip2 = [];
		var zip3 = [];
		var zip4 = [];
		var zip5 = [];

		for (var i = 0; i < zips.length; i++) {
			if (zips[i] > 40) {
				zip5.push(i);
			} else if (zips[i] > 20) {
				zip4.push(i);
			} else if (zips[i] > 10) {
				zip3.push(i);
			} else if (zips[i] > 5) {
				zip2.push(i);
			} else if (zips[i] > 0) {
				zip1.push(i);
			} else if (zips[i] == 0) {
				zip0.push(i);
			}
		}

		return {
			zip0 : zip0,
			zip1 : zip1,
			zip2 : zip2,
			zip3 : zip3,
			zip4 : zip4
		};
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
	};
	//zipLayer

	//these are our tables containing the zip code coordinates
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
		changeState : changeState,
		zipLayer : zipLayer,
	};

});
