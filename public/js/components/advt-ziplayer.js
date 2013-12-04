
/**
 * advtZipLayer.js
 *
 * A collection of materials related to the zip code layer, including a method for changing the
 * state for which the zip codes are displayed, a constructor for a zipLayer object
 *
 * @author Carl Lulay, Sam Golloway
 * @since 26 Nov. 2013
 */

define([
    'jquery',
    'Constants',
    'components/advt-highschoolLayer',
    'components/advt-mark',
    'components/advt-results-pane-builder',
    'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCIo1yWHMMSCRsr_JZ_UyuJiHZAKZ1jsxw&sensor=false!callback'

], function($, constants, highschoolLayer, markers, resultsPane) {

var highSchoolLayer = new highschoolLayer.highSchoolLayer(new google.maps.FusionTablesLayer);

/**
 *  changeState(state)
 *
 * changes the state for which the zip codes are being displayed
 *
 * @param the state to display
 * @param schools: the array of schools gathered by the response builder
 * @param zips: the zipcodes to be displayed
 * @param response: the new clean set of responses
 * @returns void
 */
 var changeState = function(state, schools) {
                console.log("changeState");
                //console.log(this.eID);
                //console.log(schools);
                newEID = ZipTables[state];
                this.eID = newEID;
                //console.log(schools);

                //make sure we have the zip code data for the state we're searching in
                if (newEID != undefined) {
                        var zips = scrubZips(schools);

                        
                        //switch the table we're using to that of the new state and
                        //display the zip code areas at different colors based upon the number of students
                        // number of students (determined by which zip array they are in)
                        this.FTLayer.setOptions({
                                query : {
                                        from : this.eID,
                                },

                                styles : [{
                                        polygonOptions : {
                                                fillColor : "#D4D4D4",
                                                fillOpacity : -10
                                        }

                                }, {
                                        where : 'ZipCodeArea  IN (' + zips.zip0 + '0' +')',
                                        polygonOptions : {
                                                fillColor : "#330033",
                                                fillOpacity : 1
                                        }

                                }, {
                                        where : 'ZipCodeArea  IN (' + zips.zip1 + '0' +')',
                                        polygonOptions : {
                                                fillColor : "#660066",
                                                fillOpacity : 1
                                        }

                                }, {
                                        where : 'ZipCodeArea  IN (' + zips.zip2 + '0' +')',
                                        polygonOptions : {
                                                fillColor : "#990099",
                                                fillOpacity : 1
                                        }

                                }, 
                                {
                                        where : 'ZipCodeArea  IN (' + zips.zip3 + '0' +')',
                                        polygonOptions : {
                                                fillColor : "#CC00CC",
                                                fillOpacity : 1
                                        }
                                },]

                        });
                } else {
                        console.log("no zip data");
                        alert("There is no data regarding this state's ZIP code boundries");
                }
                this.FTLayer.setMap(constants.MAP);
        };

        /* scrubZips(schools)
         *
         * takes in highschools and isolates their zip codes from their addresses
         *
         * @param the list of highschools
         *
         * @returns 4 zip codes arrays for the highschools, sorted by sortZips
         */
        var scrubZips = function(schools) {

                var allZips = [];
                var studentsInZipCodes = [];
                
                //a simple helper function to help us check if we've added a zip
                //code already
                var contains = function(array, item) {
                        for (var i = 0; i < array.length; i++) {
                                if (array[i] === item) {
                                        return true;
                                }
                        }
                        return false;
                };

                //go through our list of schools and scrubb the zip code from the address section
                for (var i = 0; i < schools.length; i++) {
                        var lastDigit = schools[i].address.length;
                        var firstDigit = lastDigit - 5;
                        var scrubbed = schools[i].address.substr(firstDigit, 5);
                        //keep track of all the zip codes and the number of students in each
                        if (!contains(allZips, scrubbed)) {
                                allZips.push(scrubbed);
                                studentsInZipCodes[scrubbed] = schools[i].students;
                        } else {
                                studentsInZipCodes[scrubbed] += schools[i].students;
                        }
                }

                var sortedZips = sortZips(studentsInZipCodes);
                return sortedZips;
        };

        /*
         * sortZips(zips)
         * 
         * @param zips the list of zip codes from the schools
         * 
         * @return 4 arrays of zips sorted by number of students
         */
        var sortZips = function(zips) {
                var zip0 = [];
                var zip1 = [];
                var zip2 = [];
                var zip3 = [];

                for (var i = 0; i < zips.length; i++) {
                        if (zips[i] > 20) {
                                zip3.push(i);
                        } else if (zips[i] > 10) {
                                zip2.push(i);
                        } else if (zips[i] > 5) {
                                zip1.push(i);
                        } else if (zips[i] > 0) {
                                zip0.push(i);
                        }
                }
                return {
                        zip0 : zip0,
                        zip1 : zip1,
                        zip2 : zip2,
                        zip3 : zip3,
                };
        };


/**
 *  zipLayer constructor
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
		"WA" : "1jNwC6KeDC3NnVlReslJZB8VvujKjyxQhDs7o5Tc" // TLC: 10/27.  Garcia et al.   Working.
};

return {
	  	changeState: changeState,
   		zipLayer : zipLayer
   };
});