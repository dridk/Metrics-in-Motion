/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if (mimUI != undefined) {
    //Base Element generator function
    mimUI.ElementHasChildren = function (el) {
        return (el.children !== undefined && el.children.length !== 0);
    }
    mimUI.ElementAttr = function (key, val) {
        return {key: key, val: val};
    }
    mimUI.Element = function (attrs, appendTo) {
        var self = this;
        var parent = mimUI;
        var defaults = {
            tag: 'div',
            id: mimUI.CreateUID(),
            classes: [],
            attrs: [],
            datas: [],
            text: "",
	    onChange: null,
	    onClick: null
        };
        var opts = $.extend({}, defaults, attrs);
        var el = mimUI.jq('<'+opts.tag+'/>');
        if (opts.id != "") el.attr("id", opts.id);
        if (typeof (opts.classes) == "object") {
            for (var i = 0; i < opts.classes.length; i++) {
                var c = opts.classes[i];
                el.addClass(c);
            }
        } else el.addClass(opts.classes);
        if (typeof (opts.attrs) == "object") {
            for (var i = 0; i < opts.attrs.length; i++) {
                var a = opts.attrs[i];
                if (typeof (a) == "object") el.attr(a.key, a.val);
                else el.attr(a);
            }
        };
        if (typeof (opts.datas) == "object") {
            for (var i = 0; i < opts.datas.length; i++) {
                var d = opts.datas[i];
                if (typeof (d) == "object") el.data(d.key, d.val);
                else el.data(d);
            }
        };
        if (opts.text != "") el.html(opts.text);
	if (opts.onChange != null) el.change(opts.onChange);
	if (opts.onClick != null) el.click(opts.onClick);
        if(appendTo != undefined && appendTo!= null)appendTo.append(el);
        return el;
    }
    //The element factory
    mimUI.builder = {
        self: this,
        parent: mimUI,
        spec: [],
        rootEl: null,
        baseName: "mimUI",
        //HTML generator
        setSpec: function(s){
            this.spec = s;
        },
        getSpec: function(){
            return this.spec;
        },
        setRoot: function(el){
            this.rootEl = el;
        },
        getRoot: function(){
            return this.rootEl;
        },
        _buildWalker: function(node,root){
            if(typeof(node) == "object")node.each(function(e,i){
                var el = new mimUI.Element(e,root);
                e["el"] = el;
                if(mimUI.ElementHasChildren(e))mimUI.builder._buildWalker(e.children,el);
            });
        },
        build: function(s,r){
	    var spec = s || this.spec;
	    var root = r || this.rootEl;
            mimUI.builder._buildWalker(spec,root);
        },
        clear: function(){
            this.rootEl.empty();
        },
        //Abstracts to create specs
        BaseElement: function(){
            return {tag:"div",classes:[]};
        },
        BaseContainer: function(){
            return {classes:[],children:[]};
        },
        Window: function(){
            var cn = new mimUI.builder.BaseContainer();
            cn.classes = [mimUI.builder.baseName + "-appWindow"];
            return cn;
        }
    }
} else {
    alert("Could not find MiM system object.");
}