define([
    'jquery'
], function($){
    return {
        'build' : function() {
            var gender = $("#advt-search-form input[value='male']").is(':checked') ? "male" : "female";

            return {
                //TODO: This could use some error checking.
                "entryYear": $("#advt-search-form input[type='number']").val(),
                "gender": gender,
                "applicationType": $("#advt-search-form input[name='application-type']").val(),
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
                "city": "Portland",
                "state": ""
            };
        }
    };
});