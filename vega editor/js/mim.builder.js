/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (mimUI != undefined) {
    mimUI.builder = {
        parent: mimUI,
        //generic
        _index: 999,
        createUID: function (type) {
            type = type || "mimUIelement";
            _index++;
            return type + this._index;
        },
        //Layout elements
        div: function (o) {
            var opt = parent.jq.extend({}, {
                id: this.createUID(),
                superClass: "mimUI_Div",
                class: "",
                key: ""
            }, o);
            return = parent.jq("div")
                .addClass(opt.superClass)
                .addClass(opt.class)
                .attr("id", opt.id)
                .data('key', data.id);
        },
        row: function (o) {
            var opt = parent.jq.extend({}, {
                superClass: "mimUI_Row"
            }, o);
            return this.div(opt);
        },
        col: function (o) {
            var opt = parent.jq.extend({}, {
                superClass: "mimUI_Col"
            }, o);
            return this.div(opt);
        }
    }
}
} else {
    alert("Could not find MiM system object.");
}