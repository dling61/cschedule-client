var eventDialogView = Backbone.View.extend({
    el: $('#eventDialogView'),
    events : {
        'click #createBtn' : 'eventCreateDialog'
    },
    eventCreateDialog : function(ev) {
        // console.log("hi");
        var buttons = {
            'Next': this.save
        };

        $( "#createEventStartDTFLD, #createEventEndDTFLD" ).datetimepicker({
            format: 'Y-m-d H:i',
            step: 30
        });

        $('#createEventDialog').dialog({
            draggable: true,
            resizable: true,
            show: 'fade',
            hide: 'fade',
            modal: false,
            width: 950,
            height: 600,
            title: 'Create an Event',
            buttons: buttons,
            open: this.open
        });
    },

    initialize: function() {
        // _.bindAll(this, 'render');
        
    },
    render: function() {

    },
    open: function() {
        $( "#tabs-create" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs-create li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    },
    save: function() {
    }
});