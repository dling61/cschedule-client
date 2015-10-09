var eventDialogView = Backbone.View.extend({
    el: $('#eventDialogView'),
    events : {
        'click #createBtn' : 'eventCreateDialog'
    },

    eventCreateDialog : function(event) {
        // console.log("hi");
        var buttons = {
            "back" : {
              text: 'Back',
              class: 'back-btn',
              click: this.back
            },
            "next" : {
              text: 'Next',
              class: 'next-btn',
              click: this.next
            }
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
        $('.back-btn').hide();
    },

    initialize: function() {
        _.bindAll(this, 'render');
        
    },
    render: function() {
        $(document).ready(function() {
            $('a[data-id=tab-1]').click(function() {
                $('.back-btn').hide();
            });

            $('.createEventTab').on('click', function() {
                $('.back-btn').show();
            });

            $('.radio-btn').on('click', function(){
                $('.radio-btn').prop('checked', false);
                $(this).prop('checked', true);
                if($('#radio-rp').prop('checked') == true) {
                    $('#createEventRepeat').removeClass('dialog-hide');
                    $('#createEventRepeat').addClass('dialog-show');
                    $('#createEventRS').datepicker({
                        changeMonth: true,
                        changeYear: true
                    });
                } else {
                    $('#createEventRepeat').removeClass('dialog-show');
                    $('#createEventRepeat').addClass('dialog-hide');
                }
            });
            $('#addNewTask').click(function() {
                console.log('under development');
            });
        });
    },
    open: function() {
        $( "#tabs-create" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs-create li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    },
    back: function() {
        // alert('back');
        var preTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]) - 1;
        $('a[data-id=tab-' + preTabNo + ']').children('.glyphicon-ok').remove();
        $('a[data-id=tab-' + preTabNo + ']').trigger('click');
        $('.next-btn').children().html('Next');
    },
    next: function() {
        // alert('next');
        var currTabNo = parseInt($('#create-tab-list').children('.ui-state-active').children().attr('data-id').split('-')[1]);
        var nextTabNo = currTabNo + 1;
        if(currTabNo < 4) {
            $('a[data-id=tab-' + (nextTabNo - 1) + ']').prepend('<span class="glyphicon glyphicon-ok"><span>');
            $('a[data-id=tab-' + nextTabNo + ']').trigger('click');
        }       
        if(currTabNo == 3) {
            $('.next-btn').children().html('Publish');
        }
    }
});