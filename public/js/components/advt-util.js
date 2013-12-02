define([], function() {
    return {
        toTitleCase: function(string) {
            return string.replace(/\w\S*/g, function(text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        }
    }
});