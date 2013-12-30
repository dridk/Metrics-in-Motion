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
    user: {
        _data: [],
        //Getters & setters
        getData: function () {
            return mimUI.user._data;
        },
        setData: function (data) {
            mimUI.user._data = data;
        }
    },
    //Views settings and Data:
    views: {
        //Internal vars
        _data: [],
        _index: {},
        _indexData: function () {
            mimUI.views._index = {};
            mimUI.views.each(function(data,i){
                mimUI.views._index[data.id] = i;
            });
        },
        _getIndexByKey: function (key) {
            return mimUI.views._index[key];
        },
        _total: 0,
        _current: undefined,
        _last: undefined,
        //Public functions
        each: function(fn){
            for (var i = 0; i < mimUI.views._data.length; i++) {
                fn(mimUI.views._data[i],i);
            }
        },
        //Getters & setters
        getData: function () {
            return mimUI.views._data;
        },
        setData: function (data) {
            mimUI.views._data = data;
            mimUI.views._indexData();
            //TODO load last saved state from user machine, or server
            mimUI.views.setCurrent(mimUI.views._data[0].id);//Always set the current to the first one on load
        },
        getTotal: function () {
            return mimUI.views._total;
        },
        setTotal: function (total) {
            mimUI.views._total = total;
        },
        getCurrent: function () {
            return mimUI.views._current;
        },
        getLast: function() {
            return mimUI.views._last;
        },
        setCurrent: function (key) {
            mimUI.views._last = mimUI.views._current;
            mimUI.views._current = key;
        },
        getDataByKey: function (key) {
            return mimUI.views._data[mimUI.views._getIndexByKey(key)];
        },
        getDataCurrent: function(){
            return mimUI.views.getDataByKey(mimUI.views.getCurrent());
        },
        getWidgets: function(key){
            return mimUI.views.getDataByKey(key).widgets;
        }
    },
    //Widgets settings and Data:
    widgets: {
        //Internal vars
        _data: [],
        _index: {},
        _indexData: function () {
            mimUI.widgets._index = {};
            mimUI.widgets.each(function(data,i){
                mimUI.widgets._index[data.id] = i;
                data.isInView = function(viewKey){ //create helper function on each of the widgets
                    return mimUI.views.getWidgets(viewKey).indexOf(this.id)>-1;
                };
            });
        },
        _getIndexByKey: function (key) {
            return mimUI.widgets._index[key];
        },
        _total: 0,
        //Public functions
        each: function(fn,key){
            for (var i = 0; i < mimUI.widgets._data.length; i++) {
                var widget = mimUI.widgets._data[i];
                if(key==undefined||widget.isInView(key))fn(widget,i);
            }
        },
        //Getters & setters
        getData: function () {
            return mimUI.widgets._data;
        },
        setData: function (data) {
            mimUI.widgets._data = data;
            mimUI.widgets._indexData();
        },
        getTotal: function () {
            return mimUI.widgets._total;
        },
        setTotal: function (total) {
            mimUI.widgets._total = total;
        },
        getDataByKey: function (key) {
            return mimUI.widgets._data[mimUI.widgets._getIndexByKey(key)];
        },
        getDataForCurrent: function(){
            var widgets = [];
            mimUI.widgets.each(function(data,i){
                widgets.push(data);
            },mimUI.views.getCurrent());
            return widgets;
        }
    },
    //Data Sources settings and Data:
    sources: {
    },
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
    //Setup all things here
    init: function(){
        //TODO Move all the ajax stuff here.
        
    }
};