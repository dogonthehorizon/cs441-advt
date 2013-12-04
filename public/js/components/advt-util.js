/**
 * advt-util
 *
 * A collection of utility functions that don't have a proper home.
 *
 * @author Fernando Freire
 * @since 02 Dec. 2013
 */
define([], function() {
    return {
        /**
         * toTitleCase
         *
         * Return a string where the first letter of each word is capitalized.
         *
         * @param string - the input string we want to title case.
         * @return the title cased string.
         *
         * @author Fernando Freire
         * @since 02 Dec. 2013
         */
        toTitleCase: function(string) {
            return string.replace(/\w\S*/g, function(text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        }
    }
});