/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.views = {
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
            key = key || mimUI.views._current;
            return mimUI.views._data[mimUI.views._getIndexByKey(key)];
        },
        getDataCurrent: function(){
            return mimUI.views.getDataByKey(mimUI.views.getCurrent());
        },
        getWidgets: function(key){
            key = key || mimUI.views._current;
            return mimUI.views.getDataByKey(key).widgets;
        }
    };

}else{alert("Could not find MiM system object.");}