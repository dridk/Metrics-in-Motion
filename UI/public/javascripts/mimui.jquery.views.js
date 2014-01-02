/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($) {

    $.fn.mimuiView = function (options) {

        var defaults = {
            widgetURL: "",
            widgetUpdatesURL: "",
            refreshInterval: 10000,
            viewElementName: "content-view",
            viewTitleElementName: "content-view-title",
            viewDescriptionElementName: "content-view-description",
            widgetElementName: "content-view-widget",
            gridSettings: {
                widget_base_dimensions: [380, 300],
                widget_margins: [10, 10],
                extra_rows: 99,
                extra_cols: 99,
                helper: 'clone',
                resize: {
                    enabled: true,
                    max_size: [4, 4]
                }
            },
            onRender: function(){},
            onRenderComplete: function(){}
        };

        var plugin = {};

        plugin.el = this;
        plugin.settings = {};

        var init = function () {
            plugin.settings = $.extend({}, defaults, options);
        };

        //Private functions
        //--------------------------------
        //General:
        //--------------------------------

        //--------------------------------
        //comunicator:
        //--------------------------------
//        var _comunicatorRefreshWidgets = function () {
//            mimUI.comunicator.request(
//                plugin.settings.widgetURL,
//                _comunicatorRefreshSuccess,
//                _comunicatorRefreshFalure);
//        };
//        var _comunicatorScheduleUpdate = function () {
//            setInterval(_comunicatorGetUpdates, plugin.settings.refreshInterval);
//        };
//        var _comunicatorGetUpdates = function () {
//            mimUI.comunicator.request(
//                plugin.settings.widgetUpdatesURL,
//                _comunicatorUpdateSuccess,
//                _comunicatorRefreshFalure);
//        };
//        var _comunicatorRefreshSuccess = function (data) {
//            if (!data.success) {
//                _comunicatorRefreshFalure(data);
//                return;
//            }
//            mimUI.widgets.setTotal(data.total);
//            mimUI.widgets.setData(data.result);
//            _uiRender();
//        };
//        var _comunicatorRefreshFalure = function (data) {
//            alert("Falied to communicate to server.");
//        };
//        var _comunicatorUpdateSuccess = function (data) {
//            //TODO
//            alert('Got update');
//            plugin.settings.onUpdateReceived(data);
//        };
        //--------------------------------
        //UI renderer
        //--------------------------------
        var _uiViewShow = function (el) {
            $(el).show();
            //And set the right view title:
            $(plugin.settings.viewTitleElementName.toID()).html(mimUI.views.getDataCurrent().title);
            $(plugin.settings.viewDescriptionElementName.toID()).html(mimUI.views.getDataCurrent().description);
        };
        var _uiViewHide = function (el) {
            $(el).hide();
        };
        var _uiCreateWidget = function (data, index) {
            var element =  $('<li/>')
                .data('key', data.id)
                .attr('data-row', data.position.row)
                .attr('data-col', data.position.col)
                .attr('data-sizex', data.size.width)
                .attr('data-sizey', data.size.height)
                .attr('id', plugin.settings.widgetElementName + data.id)
                .addClass(plugin.settings.widgetElementName);
            var elementView = $('<div/>')
                .addClass(plugin.settings.widgetElementName + '-view');
            var elementTitle = $('<div/>')
                .addClass(plugin.settings.widgetElementName + '-title')
                .html(data.title)
                .append("<small>"+data.description+"</small>");
                $(element).append(elementView);
                $(element).append(elementTitle);
            return element;
        };
        var _uiCreateView = function (data, index) {
            var element = $('<div/>')
                .addClass(plugin.settings.viewElementName)
                .addClass('gridster')
                .attr('id', plugin.settings.viewElementName + data.id)
                .data('key', data.id)
                .hide();
            var container = $('<ul/>')
                .addClass(plugin.settings.viewElementName + '-wrapper');
                mimUI.widgets.each(function (dataw, iw) {
                    $(container).append(_uiCreateWidget(dataw, iw));
                },data.id);
                $(element).append(container);
                
            return element;
        };
        var _uiRender = function () {
            plugin.settings.onRender();
            if (mimUI.views.getTotal() == 0) return false;
            $(plugin.el).empty();
            mimUI.views.each(function (data, i) {
                $(plugin.el).append(_uiCreateView(data, i));
            });
            
            //Setting up grid visual
            $('.gridster ul').gridster(plugin.settings.gridSettings).data('gridster');
            
            _uiViewShow(
                plugin.settings.viewElementName.concat(mimUI.views.getCurrent()).toID());
            
            plugin.settings.onRenderComplete();
        };

        //Public functions
        //--------------------------------
//        plugin.refresh = plugin.viewsRefreshConnector;
        plugin.redraw = _uiRender;
        plugin.getContainer = function () {
            return plugin.el;
        };

        //Connectors
        //--------------------------------
        plugin.viewsRefreshConnector = function (data) {
            //TODO
            //When sidebar gets views from server the data is sent here   
            _comunicatorRefreshWidgets();
        };
        plugin.viewsUpdateConnector = function (data) {
            //TODO
            //When sidebar gets updates from server the data is sent here
        };
        plugin.viewShownConnector = function (key) {
            //TODO
            //When views are switched in sidebar a signal is sent here
            _uiViewHide(
                plugin.settings.viewElementName.concat(mimUI.views.getLast()).toID());
            _uiViewShow(
                plugin.settings.viewElementName.concat(mimUI.views.getCurrent()).toID());

        };

        init();

        return plugin;
    }
})(jQuery);