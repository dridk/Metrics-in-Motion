String.prototype.toID = function(){
    return "#"+this;
}
String.prototype.toClass = function(){
    return "."+this;
}
/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
var mimUI = {
    //Internal
    
    //Generc
    alert: function(message,title){
        $(mimUI.dialogs.alert)
            .attr('title',title)
            .html("<p>"+message+"</p>")
            .dialog( "open" );
    },
    dialog: {
        addView: function(title){
            title = title || 'Add new dashboard';
            $(mimUI.dialogs.addView)
                .attr('title',title)
                .dialog( "open" );
        }
    },
    //Comunicator
    comunicator: {
        request: function(server, onSuccess, onFalure){
            return $.ajax({
                type: 'get',
                url: server,
                dataType: 'json',
                async: true,
                success: onSuccess,
                falure: onFalure
            });
        }
    },
    //User and user settings
    users: 0, //object stub
    //Views settings and Data:
    views: 0, //object stub
    //Widgets settings and Data:
    widgets: 0, //object stub
    //Data Sources settings and Data:
    sources: 0, //object stub
    //Plugin containers
    plugins: {
        sidebar:0,
        gallery:0
    },
    //Dialog containers
    dialogs: {
        error: 0,
        alert: 0,
        viewDialog: 0,
        widgetDialog: 0,
        userDialog: 0
    },
    //Sidebar containers
    sidebars: {
        left: 0,
        header: 0,
        central: 0,
        footer: 0
    },
    main: 0 //function stub
};