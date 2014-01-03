/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.views = {
        //Internal vars
        _data: [],
        _index: {},
        _indexData: function (sequentialy) {
            mimUI.views._index = {};
            mimUI.views.each(function(data,i){
                mimUI.views._index[data.id] = i;
            });
        },
        _getIndexByKey: function (key) {
            return mimUI.views._index[key];
        },
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
        setData: function (data, update) {
            if(update){
                mimUI.views._data.push(data);
            }else mimUI.views._data = data;
            mimUI.views._indexData();
            mimUI.widgets._indexData();
            //TODO load last saved state from user machine, or server
            if(!update)mimUI.views.setCurrent(mimUI.views._data[0].id);//Always set the current to the first one on load
        },
        getTotal: function () {
            return mimUI.views._data.length;
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
        },
        //Add/Remove functionality
        add: function(data){
            //Data is expected to have:
            //title, description, style
            mimUI.views.setData(data,true);
            //TODO notify server
        },
        remove: function(key){
            
            //TODO notify server
        }
    };

}else{alert("Could not find MiM system object.");}