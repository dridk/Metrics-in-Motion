/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.users = {
        _data: [],
        //Getters & setters
        getData: function () {
            return mimUI.user._data;
        },
        setData: function (data) {
            mimUI.user._data = data;
        }
    };

}else{alert("Could not find MiM system object.");}