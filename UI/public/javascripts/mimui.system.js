String.prototype.toNumber = function(){
    return this*1.0;
}
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
    options: {
        baseURL: "http://fsgin.firstswissgroup.com:3000",
        viewsURL: "/users/32/views",
        widgetsURL: "",
    },
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
    comunicator: 0, //Object stub
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