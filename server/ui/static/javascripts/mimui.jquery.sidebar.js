/****************************************************/
/****************Metrics in Motion*******************/
/****************************************************/
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($) {

    $.fn.mimuiSidebar = function (options) {

        var defaults = {
            viewsURL: "",
            viewsUpdatesURL: "",
            refreshInterval: 10000,
            itemElementName: "content-views-list-item",
            onViewSwitch: function (key) {
                return key;
            },
            onViewsRefreshed: function (data) {
                return data;
            },
            onUpdateReceived: function (data) {
                return data;
            }
        }

        var plugin = {};

        plugin.el = this;
        plugin.settings = {}

        var init = function () {
            plugin.settings = $.extend({}, defaults, options);
            //_comunicatorRefreshViews(); //First call to set up the sidebar
            //_comunicatorScheduleUpdate(); //Schedule first update
        }

        //Private functions
        //--------------------------------
        //General:
        //--------------------------------

        //--------------------------------
        //comunicator:
        //--------------------------------
//        var _comunicatorRefreshViews = function () {
//            mimUI.comunicator.request(
//                plugin.settings.viewsURL,
//                _comunicatorRefreshSuccess,
//                _comunicatorRefreshFalure);
//        };
//        var _comunicatorScheduleUpdate = function () {
//            setInterval(_comunicatorGetUpdates, plugin.settings.refreshInterval);
//        };
//        var _comunicatorGetUpdates = function () {
//            mimUI.comunicator.request(
//                plugin.settings.viewsUpdatesURL,
//                _comunicatorUpdateSuccess,
//                _comunicatorRefreshFalure);
//        };
//        var _comunicatorRefreshSuccess = function (data) {
//            if (!data.success) {
//                _comunicatorRefreshFalure(data);
//                return;
//            }
//            mimUI.views.setTotal(data.total);
//            mimUI.views.setData(data.result);
//            _uiRender();
//            plugin.settings.onViewsRefreshed(data);
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
        var _uiClearHighlight = function (el) {
            $(el).removeClass('selected');
            return el;
        };
        var _uiSetHighlight = function (el) {
            $(el).addClass('selected');
            return el;
        };
        var _uiSetUpdate = function (el) {
            $(el).addClass('updated');
            return el;
        };
        var _uiClearUpdate = function (el) {
            $(el).removeClass('updated');
            return el;
        };
        var _uiMenuItemClick = function (e) {
            var key = $(this).data('key'); //Get the view ID
            if (mimUI.views.getCurrent() == key) return key; //Check if view already selected
            mimUI.views.setCurrent(key);
            _uiClearHighlight(
                plugin.settings.itemElementName.concat(mimUI.views.getLast()).toID());
            _uiSetHighlight(this);
            return plugin.settings.onViewSwitch(key);
        };
        var _uiCreateMenuItem = function (item, index) {
            item.id = item.id || '';
            item.title = item.title || '';
            item.description = item.description || '';
            var element = $('<div/>')
                .attr("id", plugin.settings.itemElementName + item.id)
                .data("key", item.id)
                .addClass('content-views-list-item')
                .append($('<label/>').addClass('ui-label ui-size-heavy').html(item.title))
                .append($('<label/>').addClass('ui-label ui-size-small').html(item.description))
                .click(_uiMenuItemClick);
            return element;
        };
        var _uiRender = function () {
            if (mimUI.views.getTotal() == 0) return false;
            $(plugin.el).empty();
            mimUI.views.each(function (data, i) {
                $(plugin.el).append(_uiCreateMenuItem(data, i));
            });
            _uiSetHighlight(
                plugin.settings.itemElementName.concat(mimUI.views.getCurrent()).toID());
        };

        //Public functions
        //--------------------------------
        //plugin.refresh = _comunicatorRefreshViews;
        plugin.redraw = _uiRender;
        plugin.getContainer = function () {
            return plugin.el;
        };

        init();

        return plugin;
    }
})(jQuery);