/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (mimUI != undefined) {
    mimUI.vega.editor.spec = {
        parent: mimUI.vega.editor,
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
            var root = this.parent;
            root._spec = {
                type: "lineChart",
                title: "",
                subtitle: "",
                legend: false,
                interpolate: false,
                dataHasHeaders: null,
                datas: []
            }
            root._spec.scalex = this.newScale();
            root._spec.scaley = this.newScale();
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
            var root = this.parent;
            delete root._data;
            root._data = null;
            delete root._spec;
            root._spec = null;
        },
        set: function (s) {
            this.parent._spec = s;
        },
        get: function () {
            return this.parent._spec;
        },
        update: function () {
            var root = this.parent;
            root.data.findCommon();
            delete root._spec.scalex.fields;
            delete root._spec.scaley.fields;
            root._spec.scalex.fields = root.data.findCategory();
            root._spec.scaley.fields = root.data.findValues();
        }
    };
} else {
    alert("Could not find MiM system object.");
}