/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.widgets = {
        //Internal vars
        _index: {},
        _current: undefined,
        _indexData: function () {
            mimUI.widgets._index = {};
            mimUI.views.each(function(data,i){
                for (var wi = 0; wi < data.widgets.length; wi++) {
                    var widget = data.widgets[wi];
                    mimUI.widgets._index[widget.id] = {
                        view: i,
                        widget: wi,
                        el: undefined,
                        vega: undefined
                                                      };
                    
                }
            });
        },
        _getIndexByKey: function (key) {
            return mimUI.widgets._index[key];
        },
        _total: 0,
        //Public functions
        each: function(fn,key){
            var data = mimUI.views.getWidgets(key);
            for (var i = 0; i < data.length; i++) {
                var widget = data[i];
                fn(widget,i);
            }
        },
        //Getters & setters
        getTotal: function () {
            return mimUI.widgets._index.length;
        },
        getWidgetInView: function(view,widget){
            return mimUI.views._data[view].widgets[widget];
        },
        getWidgetByKey: function (key) {
            return mimUI.widgets.getWidgetInView(mimUI.widgets._index[key].view,
                                                mimUI.widgets._index[key].widget);
        },
        getWidgetForCurrent: function(){
            return mimUI.views.getWidgets();
        },
        getWidgetElement: function(key){
            return mimUI.widgets._index[key].el;
        },
        setWidgetElement: function(el,key){
            mimUI.widgets._index[key].el = el;
        },
        getWidgetVega: function(key){
            return mimUI.widgets._index[key].vega;
        },
        setWidgetVega: function(vega,key){
            mimUI.widgets._index[key].vega = vega;
        },
        getWidgetSpec: function(key){
            return getWidgetByKey(key).spec;
        },
        setWidgetSpec: function(spec,key){
            mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].spec = spec;
        },
        getWidgetPosition: function(key){
            return getWidgetByKey(key).position;                
        },
        setWidgetPosition: function(position,key){
            mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].position = position;
        },
        getWidgetSize: function(key){
            return getWidgetByKey(key).size;
        },
        setWidgetSize: function(size,key){
            mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].size = size;
        },
        //Updaters
        selectWidgetByKey: function(key){
            mimUI.widgets._current = key;
        },
        withSelected: {
            getWidget: function(){
                return mimUI.widgets.getWidgetInView(mimUI.widgets._index[mimUI.widgets._current].view,
                                                    mimUI.widgets._index[mimUI.widgets._current].widget);
            },
            getElement: function(){
                return mimUI.widgets._index[mimUI.widgets._current].el;
            },
            setElement: function(el){
                mimUI.widgets._index[mimUI.widgets._current].el = el;
            },
            getVega: function(){
                return mimUI.widgets._index[mimUI.widgets._current].vega;
            },
            setVega: function(vega){
                mimUI.widgets._index[mimUI.widgets._current].vega = vega;
            },
            getSpec: function(){
                return mimUI.widgets.getWidgetByKey(mimUI.widgets._current).spec;
            },
            setSpec: function(spec){
                var key = mimUI.widgets._current;
                mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].spec = spec;
            },
            getPosition: function(){
                return mimUI.widgets.getWidgetByKey(mimUI.widgets._current).position;                
            },
            setPosition: function(position){
                var key = mimUI.widgets._current;
                mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].position = position;
            },
            getSize: function(){
                return mimUI.widgets.getWidgetByKey(mimUI.widgets._current).size;
            },
            setSize: function(size){
                var key = mimUI.widgets._current;
                mimUI.views._data[mimUI.widgets._index[key].view].widgets[mimUI.widgets._index[key].widget].size = size;
            }            
        },
        //Add/Remove functionality
        add: function(data){
            
            //TODO notify server
        },
        remove: function(key){
            
            //TODO notify server
        }
    };

}else{alert("Could not find MiM system object.");}