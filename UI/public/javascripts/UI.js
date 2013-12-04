/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/

$( document ).ready(function() {
    $('body').layout({
        defaults: {
            resizable:  false,
            closable:   false
        },
        center__childOptions: {
            defaults: {
                resizable:  false,
                closable:   false
            },
            center__paneSelector:	".ui-layout-inner-center",
			north__paneSelector:	".ui-layout-inner-north",
			south__paneSelector:	".ui-layout-inner-south"
        },
        west__childOptions: {
            defaults: {
                resizable:  false,
                closable:   false
            },
            center__paneSelector:	".ui-layout-inner-center",
			north__paneSelector:	".ui-layout-inner-north",
			south__paneSelector:	".ui-layout-inner-south"
        }
    });
    $( 'body' ).tooltip({
        show: {
            effect: "fade",
            delay: 1000
        },
        position: {
            my: "center top+5",
            at: "center bottom",
            using: function( position, feedback ) {
              $( this ).css( position );
              $( "<div>" )
                .addClass( "ui-tooltip-arrow" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }
    });
    $( ".ui-widget-button" ).button();
    $( ".ui-widget-buttongroup" ).buttonset();
    $( ".ui-widget-checkbox" ).checkbox();
    $( ".ui-widget-spinner" ).spinner();
//    $( "[data-widget=dropdown]" ).menu();
//    $( "[data-widget=slider]" ).slider();
//    $( "[data-widget=progressbar]" ).progressbar();
    //$( ".ui-widget-dialog" ).dialog();
    $( "#content-error-dialog").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
    
    $("#content-add-view").click(function(){$( "#content-error-dialog").dialog( "open" );})
});