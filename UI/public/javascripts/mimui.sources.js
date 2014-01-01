/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.sources = {
        _data: [],
        //Getters & setters
        getData: function () {
            return mimUI.sources._data;
        },
        setData: function (data) {
            mimUI.sources._data = data;
        }
    };
}