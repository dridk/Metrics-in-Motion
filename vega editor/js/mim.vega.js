var mim = {};

/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
mim.vega = {
    lib: vg,
    editor: {
        _data: 0,
        _dataHasHeaders: null,
        _spec: null,
        spec: {
            newDataDescriptor: function () {
                return {
                    index: 0,
                    name: "",
                    type: "text",
                    color: "",
                    thickness: 0,
                    symbol: ""
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
                    datas: []
                }
                root._spec.scalex = root.spec.newScale();
                root._spec.scaley = root.spec.newScale();
            },
            newScale: function () {
                return {
                    title: "",
                    showTitle: false,
                    showNice: false,
                    showZero: false,
                    showGrid: true,
                    fields: []
                };
            },
            reset: function () {
                var root = mim.vega.editor;
                root._data = null;
                root._dataHasHeaders = null;
                root._spec = null;
            }
        },
        data: {
            guessType: function (d) {
                var _d = d+"";
                if (_d.toNumber()) return "number";
                //TODO Invent is sane way to guess date
                return "text";
            },
            hasHeaders: function () {
                var root = mim.vega.editor;
                if (root._dataHasHeaders != null) return root._dataHasHeaders;
                var sampleRow = root._data[0];
                var textCols = 0,
                    numCols = 0;
                //Check if this row only has strings
                //Need to know if this is a header row
                sampleRow.each(function (d) {
                    if (d.toNumber()) numCols++;
                    else textCols++;
                });
                return root._dataHasHeaders = (numCols < textCols);
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
            analyze: function () {
                var root = mim.vega.editor;
                var sampleRow = root.data.hasHeaders() ?
                    root._data[1] :
                    root._data[0],
                    headers = root.data.getHeaders();
                root.spec.newSpec();
                //Check the data types
                sampleRow.each(function (d, i) {
                    var descriptior = root.spec.newDataDescriptor();
                    descriptior.index = i;
                    descriptior.name = headers[i];
                    descriptior.type = root.data.guessType(d);
                    root._spec.datas.push(descriptior);
                });
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
            }
        }
    }
};