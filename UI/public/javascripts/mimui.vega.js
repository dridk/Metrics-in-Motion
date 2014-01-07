/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.vega = {
        _spec: 0,
        _specSize: {width:0,height:0},
        
        setSpec: function(spec){
            mimUI.vega._spec = spec;
        },
        getSpec: function(){
            return mimUI.vega._spec;
        },
        comleteSpec: function(spec){
            //TODO we finalise spec here before passing it to vega parser to make sure it's complete
            return spec;
        }
    };
}else{alert("Could not find MiM system object.");}