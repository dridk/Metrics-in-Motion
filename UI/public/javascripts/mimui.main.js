/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.main = function(){
        mimUI.dialogs.alert = $( "#content-error-dialog").dialog({
            height: 140,
            modal: true,
            autoOpen: false,
            buttons: {
                Close: function() {
                    $( this ).dialog( "close" );
                }
            }                
        });
        
        mimUI.dialogs.viewDialog = $( "#ui-dialog-addview" ).dialog({
            width: 600,
            height: 400,
            modal: true,
            autoOpen: false,
            buttons: {
                Cancel: function() {
                    $( this ).dialog( "close" );
                },
                Save: function(){
                    $( this ).dialog( "close" );
                }
            }
        });
        
        mimUI.plugins.gallery = $('#content-gallery').mimuiView();
        mimUI.plugins.sidebar = $('#content-views-list').mimuiSidebar({
            onViewSwitch: mimUI.plugins.gallery.viewShownConnector,
            onUpdateReceived: mimUI.plugins.gallery.viewsUpdateConnector,
            onViewsRefreshed: mimUI.plugins.gallery.viewsRefreshConnector
        });
        
    };
}