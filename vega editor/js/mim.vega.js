var mim = {};

/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
mim.vega = {
    lib: vg,
    editor: {
        _data: null,
        _spec: null,
        spec: {
            newDataDescriptor: function () {
                return {
                    index: 0,
                    name: "",
                    type: "text",
                    color: "",
                    thickness: 0,
                    symbol: "",
                    isCommon: true
                };
            },
            newSpec: function () {
                var root = mim.vega.editor;
                root._spec = {
                    type: "lineChart",
                    title: "",
                    subtitle: "",
                    legend: false,
                    interpolate: false,
                    dataHasHeaders: null,
                    datas: []
                }
                root._spec.scalex = root.spec.newScale();
                root._spec.scaley = root.spec.newScale();
            },
            newScale: function () {
                return {
                    title: "",
                    type: "",
                    showTitle: false,
                    showNice: false,
                    showZero: false,
                    showGrid: true,
                    fields: []
                };
            },
            reset: function () {
                var root = mim.vega.editor;
                delete root._data;
                root._data = null;
                delete root._spec;
                root._spec = null;
            }
        },
        data: {
            guessType: function (d) {
                var _d = d+"",
                    _n = _d.toNumber(),
                    _t = new Date(_d),
                    _type = "text";
                if (_n) _type =  "number";
                //TODO Invent is sane way to guess date
                //console.log(_t);
                //if (_t != "Invalid Date"&& _t.getFullYear()>1900&&_t.getFullYear()<2030) _type = "date";
                return _type;
            },
            hasHeaders: function () {
                var root = mim.vega.editor;
                if (root._spec.dataHasHeaders != null) return root._spec.dataHasHeaders;
                var sampleRow = root._data[0];
                var textCols = 0,
                    numCols = 0;
                //Check if this row only has strings
                //Need to know if this is a header row
                sampleRow.each(function (d) {
                    if (d.toNumber()) numCols++;
                    else textCols++;
                });
                return root._spec.dataHasHeaders = (numCols < textCols);
            },
            getHeaders: function () {
                var root = mim.vega.editor;
                if (root.data.hasHeaders()) return root._data[0];
                var sampleRow = root._data[0],
                    headers = [];
                sampleRow.each(function (d, i) {
                    headers.push("Column " + i);
                });
                return headers;
            },
            findCommon: function() {
                var root = mim.vega.editor,
                    size = root._spec.datas.length;
                root._spec.datas.each(function (d, i) {
                    var hit = 0,
                        miss = 0;
                    root._spec.datas.each(function (dd, ii) {
                        if(d.type==dd.type)hit++;
                        else miss++;
                    });
                    if(hit>miss)d.isCommon = true;
                    else d.isCommon = false;
                });
            },
            findCategory: function () {
                var root = mim.vega.editor;
                
                var cats = [];
                root._spec.datas.each(function (d, i) {
                    if(!d.isCommon)cats.push(i);
                });
                return cats;
            },
            findValues: function () {
                var root = mim.vega.editor;
                var vals = [];
                root._spec.datas.each(function (d, i) {
                    if(d.isCommon)vals.push(i);
                });                
                return vals;                
            },
            analyze: function () {
                var root = mim.vega.editor;
                root.spec.newSpec();
                var sampleRow = root.data.hasHeaders() ?
                    root._data[1] :
                    root._data[0],
                    headers = root.data.getHeaders();
                //Check the data types
                sampleRow.each(function (d, i) {
                    var descriptior = root.spec.newDataDescriptor();
                    descriptior.index = i;
                    descriptior.name = headers[i];
                    descriptior.type = root.data.guessType(d);
                    root._spec.datas.push(descriptior);
                });
                root.data.update();
            },
            set: function (d) {
                var root = mim.vega.editor;
                root.spec.reset();
                root._data = d;
                root.data.analyze();
            },
            get: function () {
                var root = mim.vega.editor;
                return root._data;
            },
            update: function () {
                var root = mim.vega.editor;
                root.data.findCommon();
                delete root._spec.scalex.fields;
                delete root._spec.scaley.fields;
                root._spec.scalex.fields = root.data.findCategory();
                root._spec.scaley.fields = root.data.findValues();
            }
        }
    }
};