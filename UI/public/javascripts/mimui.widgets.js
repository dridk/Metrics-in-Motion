/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.widgets = {
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
    };
}