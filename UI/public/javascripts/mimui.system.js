Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [ 
            'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty',
            'isPrototypeOf', 'propertyIsEnumerable', 'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }   
        }

        return result;
    };
})();
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
        baseURL: "http://localhost:3000",
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
    //Vega spec manipulator
    vega: 0, //object stub
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