/**
 * advt-export-dialog
 *
 * Business Logic (TM) for the export dialog (it doesn't make sense to store all this in main).
 *
 * @author Fernando Freire
 * @since 02 Dec. 2013
 *
 */
define([
    'jquery',
    'jquery-ui'
], function($) {

    var $exportDataCheckbox = $('#advt-export-form-data');
    var $exportDataLocation = $("#advt-export-form-data-loc");

    var $exportMapCheckbox = $('#advt-export-form-map');
    var $exportMapLocation = $("#advt-export-form-map-loc");

    // Initialize the export dialog
    $( "#advt-export-dialog" ).dialog({
        autoOpen: false,
        height: 400,
        width: 400,
        modal: true,
        title: 'Export Results',
        buttons: {
            'Save': function() {
                $(this).dialog('close');
            },
            'Cancel': function() {
                $(this).dialog('close');
            }
        }
    });

    // Attach listeners to the checkboxes to enable/disable file save inputs as needed.
    $exportDataCheckbox.on('change', function() {
        if ($exportDataLocation.prop('disabled') === false) {
            $exportDataLocation.prop('disabled', true);
        } else {
            $exportDataLocation.prop('disabled', false);
        }
    });

    $exportMapCheckbox.on('change', function() {
        if ($exportMapLocation.prop('disabled') === false) {
            $exportMapLocation.prop('disabled', true);
        } else {
            $exportMapLocation.prop('disabled', false);
        }
    });

});