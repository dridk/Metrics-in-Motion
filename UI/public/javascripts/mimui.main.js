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
        
        //Set up the gallery view plugin
        mimUI.plugins.gallery = $('#content-gallery').mimuiView({            
            widgetURL: "http://localhost:3000/users/32/widgets",
            gridSettings: {
                widget_base_dimensions: [380, 300],
                widget_margins: [10, 10],
                extra_rows: 99,
                extra_cols: 99,
                helper: 'clone',
                resize: {
                    enabled: true,
                    max_size: [4, 4]
                }
            }
        });
        //Set up the sidebar plugin and connect it to the gallery plugin
        mimUI.plugins.sidebar = $('#content-views-list').mimuiSidebar({            
            viewsURL: "http://localhost:3000/users/32/views",
            viewsUpdatesURL: "http://localhost:3000/users/32/views/updates",
            onViewSwitch: mimUI.plugins.gallery.viewShownConnector,
            onUpdateReceived: mimUI.plugins.gallery.viewsUpdateConnector,
            onViewsRefreshed: mimUI.plugins.gallery.viewsRefreshConnector
        });
        
        mimUI.comunicator.refreshAll();
                
        $("#content-add-view").click(function(){
            mimUI.dialog.addView();
        })        
        
    };
}else{alert("Could not find MiM system object.");}