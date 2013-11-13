/**
 * advt-form-data-builder
 *
 * This is a helper module to construct a JSON object based upon form submission data.
 *
 * @author Fernando Freire
 * @since  11/13/13
 *
 * @depends jQuery
 */
define([
    'jquery'
], function($){
    return {
        /**
         * build
         *
         * Responsible for building and sanitizing form input into a JSON object to be pass around
         * to other modules.
         *
         * @author Fernando Freire
         * @since 11/13/13
         *
         * @returns {{entryYear: *, gender: string, applicationType: *, satReading: {min: *, max: *},
         *            satMath: {min: *, max: *}, gpa: {min: *, max: *}, intendedMajor: *,
         *            city: string, state: string}}
         */
        'build' : function() {
            var gender = $("#advt-search-form input[value='male']").is(':checked') ? "male" : "female";

            return {
                //TODO: This could use some error checking.
                "entryYear": $("#advt-search-form input[type='number']").val(),
                "gender": gender,
                "applicationType": $('#advt-application-type').val(),
                "satReading": {
                    "min": $('#advt-sat-read-min').val(),
                    "max": $('#advt-sat-read-max').val()
                },
                "satMath": {
                    "min": $('#advt-sat-math-min').val(),
                    "max": $('#advt-sat-math-max').val()
                },
                "gpa": {
                    "min": $('#advt-gpa-min').val(),
                    "max": $('#advt-gpa-max').val()
                },
                "intendedMajor": $('#advt-intended-majors').val(),
                //TODO: Only send one or the other, not both.
                "city": $('#advt-city-input').val(),
                "state": $('#advt-state-select').val()
            };
        }
    };
});
