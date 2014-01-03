/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.users = {
        _data: [],
        _current: undefined,
        //Getters & setters
        getData: function () {
            return mimUI.user._data;
        },
        setData: function (data) {
            mimUI.user._data = data;
        },
        getUserID: function(){
            return 32;
        }
    };

}else{alert("Could not find MiM system object.");}