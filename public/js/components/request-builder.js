/**
 * request-builder
 *
 * Receives a JSON array from the form and uses it to query the Fusion Table data.
 *
 * @author Aaron Dobbe
 * @since 11/12/13
 * @depends google, jquery, response-builder.js
 */
 define(['jquery', './response-builder'], function($, respBuilder) {
    return { 
		/**
		  * build
		  *
		  * Converts data from the form into a Fusion Table query, then queries the table.
		  * Note: you must have the API key for this function to work. (See advt-maps)
		  *
		  * @author Aaron Dobbe
		  * @since 11/12/13
		  */
		build: function(formData) {
			var API_KEY = "{REQUEST_API_KEY}";
			
			var TABLE_ID = "1wn1wqRgW7XBJMZHC4vet88eC2vkkWvmrPiE1fnc";
			
			var reqString = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT UPortland_UniqueID, HighSchoolCode, 'High School Name', Location FROM "
							+ TABLE_ID + " WHERE ";
			
			if (formData.entryYear) {
				reqString += "Entry_Year = " + formData.entryYear + " AND ";
			}
			
			if (formData.gender) {
				if (formData.gender == "male") reqString += "Gender = 'M' AND ";
				if (formData.gender == "female") reqString += "Gender = 'F' AND ";
			}
			
			if (formData.applicationType) {
				if (formData.applicationType == "Completed") {
					reqString += "Application_Status = 'C' AND ";
				}
				else if (formData.applicationType == "Accepted") {
					reqString += "App_Decision_Code = 'A' AND ";
				}
				else if (formData.applicationType == "Waitlisted") {
					reqString += "App_Decision_Code = 'W' AND ";
				}
				else if (formData.applicationType == "Deposit") {
					// Not sure yet.
					reqString += "";
				}
				else if (formData.applicationType == "Visitation") {
					reqString += "UPVisits IN ('AVJ', 'SVD', 'UPV') AND ";
				}
				else if (formData.applicationType == "AVJ") {
					reqString += "UPVisits = 'AVJ' AND ";
				}
				else if (formData.applicationType == "SVD") {
					reqString += "UPVisits = 'SVD' AND ";
				}
				else if (formData.applicationType == "Fair") {
					// Not sure yet.
					reqString += "";
				}
				else if (formData.applicationType == "Introduction") {
					// Not sure yet.
					reqString += "";
				}
				else if (formData.applicationType == "Sneaker") {
					reqString += "First_Contact_Code = '1ST' AND ";
				}
			}
			
			if (formData.intendedMajor)
			{
				reqString += "Planned_Major_Code = " + formData.intendedMajor + " AND ";
			}
			
			if (formData.city)
			{
				reqString += "Location CONTAINS IGNORING CASE '" + formData.city + "' AND ";
			}
			
			if (formData.state)
			{
				reqString += "State = '" + formData.state + "' AND ";
			}
			
			// SAT/GPA data will always be there
			reqString += "SAT_Verbal >= " + formData.satReading.min + " AND SAT_Verbal <= " + formData.satReading.max;
			reqString += " AND SAT_MAth >= " + formData.satMath.min + " AND SAT_MAth <= " + formData.satMath.max;
			reqString += " AND HS_GPA >= " + formData.gpa.min + " AND HS_GPA <= " + formData.gpa.max;
			
			reqString += "&key=" + API_KEY;
			
			// Create a callback function to run after the FT request has completed
			var response = function( data ) { 
				//console.log(data);
				respBuilder.build(data, formData.city, formData.state);
			}
			
			// Use JQuery to make a request to the Fusion Table
			$.get(reqString, response);
		}
	}
 });