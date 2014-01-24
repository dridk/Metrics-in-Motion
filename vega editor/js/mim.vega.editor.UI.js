/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (mimUI != undefined) {
    mimUI.vega.editor.UI = {
        parent: mimUI.vega.editor,
        UI: mimUI.builder
    }
} else {
    alert("Could not find MiM system object.");
}