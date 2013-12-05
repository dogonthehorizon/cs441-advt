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

    var _resultObjectBuilder = function(name, numStudents) {
        var $div = $("<div class='advt-result-item'></div>");
        $("<h4>" + name + "</h4>").appendTo($div);
        $("<p><strong>No. Students:</strong> " + numStudents + "</p>").appendTo($div);
        $("<hr />").appendTo($div);

        return $div;
    };

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
        update: function(results, totalStudents) {

            $resultsPane.empty();

            if(results.length <= 0) {
                var $p = $("<p>We do not have zip code data for the State you are searching for. " +
                    "We are placing down all highschool markers at once. This may take a while. </p>");

                $resultsPane.append($p);
            }

            var $totalStudents =  $("<div class='advt-result-total'></div>");
            $("<h3><strong>Total Students:</strong> " + totalStudents + "</h3>").appendTo($totalStudents);
            $("<hr />").appendTo($totalStudents);

            $resultsPane.append($totalStudents);

            $.each(results, function(idx, val) {

                var $resultObject = _resultObjectBuilder(util.toTitleCase(val.name), val.students);
                $resultsPane.append($resultObject);
            });
        }
    };
});