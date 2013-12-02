/**
 * advt-results-pane-builder
 *
 * Functions to manipulate the results pane located on the right hand side of the app.
 *
 * @author Fernando Freire
 * @since 02 Dec. 2013
 */
define([
    'jquery',
    'components/advt-util'
], function($, util) {

    // The element that contains detailed results for a region.
    // @private
    var $resultsPane = $("#results div");

    return {

        /**
         * update
         *
         * Updates the results pane with the results for the given zip code region.
         *
         * @param results - An array of school objects to display in the results pane.
         * @return void
         *
         * @author Fernando Freire
         * @since 02 Dec. 2013
         */
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