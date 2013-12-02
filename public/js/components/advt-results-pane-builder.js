define([
    'jquery',
    'components/advt-util'
], function($, util) {

    // The element that contains detailed results for a region.
    // @private
    var $resultsPane = $("#results div");

    return {
        update: function(results) {

            $resultsPane.empty();

            $.each(results, function(idx, val) {
                var $div = $("<div class='advt-result-item'></div>");
                var schoolName = util.toTitleCase(val.name);

                $("<h4>" + schoolName + "</h4>").appendTo($div);
                $("<p><strong>No. Students:</strong> " + val.students + "</p>").appendTo($div);
                $("<hr />").appendTo($div);

                $resultsPane.append($div);
            });
        }
    }
});