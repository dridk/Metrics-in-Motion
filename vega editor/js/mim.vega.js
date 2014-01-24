/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (mimUI != undefined) {
    mimUI.vega = {
        parent: mimUI,
        lib: vg,
        charts: 0, //mim.vega.charts.js
        editor: {
            _data: null,
            _spec: null,
            spec: 0, //mim.vega.editor.spec.js
            data: 0, //mim.vega.editor.data.js
            UI: 0 //mim.vega.editor.UI.js
        }
    };
} else {
    alert("Could not find MiM system object.");
}