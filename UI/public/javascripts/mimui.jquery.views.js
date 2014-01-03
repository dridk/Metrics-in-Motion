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
        var _uiSetupChart = function(data, el) {
            var key = data.id;
            var dom = el.get();
            var spec = data.spec;
            spec.width = plugin.settings.gridSettings.widget_base_dimensions[0]*data.size.width-spec.padding.left-spec.padding.right;
            spec.height = plugin.settings.gridSettings.widget_base_dimensions[1]*data.size.height-40-spec.padding.top-spec.padding.bottom;
            vg.parse.spec(spec, function(chart) {
                  var vega = chart({el:dom[0], renderer: "canvas"});
                  vega.update({duration:500, ease:"fade-in"});
                  mimUI.widgets.setWidgetVega(vega,key);
              });
            mimUI.widgets.withSelected.setElement(dom[0]);
            return el;
        }
        var _uiWidgetOnDrag = function (e, ui){
            var el = ui.$helper.context;
            var key = $(el).data('key');
            console.log('STOP position: ' + ui.position.top +' '+ ui.position.left);
        };
        var _uiWidgetOnResize = function (e, ui, el){
            var key = $(el).data('key');
            mimUI.widgets.selectWidgetByKey(key);
            var data = mimUI.widgets.getWidgetByKey(key);
            data.size.width = $(el).attr('data-sizex');
            data.size.height = $(el).attr('data-sizey');
            var spec = mimUI.widgets.withSelected.getSpec();
            var vega = mimUI.widgets.withSelected.getVega();
            vega.width(plugin.settings.gridSettings.widget_base_dimensions[0]*data.size.width-spec.padding.left-spec.padding.right);
            vega.height(plugin.settings.gridSettings.widget_base_dimensions[1]*data.size.height-40-spec.padding.top-spec.padding.bottom);
            vega.update({duration:300});
//            console.log('STOP position: ' + ui.position.top +' '+ ui.position.left);
        };
        var _uiCreateWidget = function (data, index) {            
            mimUI.widgets.selectWidgetByKey(data.id);
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
            elementView = _uiSetupChart(data,elementView);
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
            plugin.settings.gridSettings.draggable.stop = _uiWidgetOnDrag;
            plugin.settings.gridSettings.resize.stop = _uiWidgetOnResize;
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