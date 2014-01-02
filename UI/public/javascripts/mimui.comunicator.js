/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
if(mimUI!=undefined){
    mimUI.comunicator = {        
        _request: function(server, onSuccess, onFalure){
            return $.ajax({
                type: 'get',
                url: server,
                dataType: 'json',
                async: true,
                success: onSuccess,
                falure: onFalure
            });
        },
        _comunicatorRefreshFalure : function (data) {
            alert("Falied to communicate to server.");
        },
        _comunicatorRefreshSuccess: function (data) {
            if (!data.success) {
                _comunicatorRefreshFalure(data);
                return;
            }
            mimUI.views.setTotal(data.total);
            mimUI.views.setData(data.result);
            mimUI.plugins.sidebar.redraw();
        },
        refreshAll: function(){
            mimUI.comunicator._request(
                mimUI.options.baseURL+mimUI.options.viewsURL,
                mimUI.comunicator._comunicatorRefreshSuccess,
                mimUI.comunicator._comunicatorRefreshFalure);
        }
    };

}else{alert("Could not find MiM system object.");}