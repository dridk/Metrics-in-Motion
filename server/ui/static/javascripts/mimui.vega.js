/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.vega = {
        _spec: 0,
        _widgetSpan: {rows:0,cols:0},
        _widgetSize: {width:0,height:0},
        _widgetMargin: {top:0,right:0,bottom:0,left:0},
        _viewMargin: {top:0,right:0,bottom:0,left:0},
        setSpec: function(spec){
            mimUI.vega._spec = spec;
        },
        getSpec: function(){
            return mimUI.vega._spec;
        },
        prepareSpec: function(spec){
            //TODO we finalise spec here before passing it to vega parser to make sure it's complete
            return spec;
        }
    };
}else{alert("Could not find MiM system object.");}