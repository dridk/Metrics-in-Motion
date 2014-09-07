/*!
 * mim.backbone.js
 * http://projects.labsquare.org/mim
 * Version: 1.0.0-beta
 *
 * Copyright 2014 Lab²
 * Released under the XXXXXXXXXXX license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */





/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * User 
 * Classes definitions
 */

var User = Backbone.Model.extend(
{
	urlRoot: "api/users"

});

var UserList = Backbone.Collection.extend(
{
	url:"api/users",
	model : User,
	parse: function (response) 
	{
		return response.results;
	}
});




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Dashview 
 * Classes definitions
 */

// Model
var Dasview = Backbone.Epoxy.Model.extend(
{
	computeds: 
	{
        link: function() 
        {
            return "javascript:mimController.displayDashview('" + this.get("id") + "');";
        }
    },
	urlRoot: "api/dashviews"
});

var DasviewList = Backbone.Collection.extend(
{
	url: "api/dashviews",
	model : Dasview,
	parse: function (response) 
	{
		return response.results;
	}
});


// View 
var DashviewItemView = Backbone.Epoxy.View.extend(
{
	el:"<li><a></a><span></span></li>",

    bindings: 
    {
        "a": "text:title,attr:{href:link,title:description}",
        "span": "text:widget_count"
    }
});

var DashviewsListView = Backbone.Epoxy.View.extend(
{
    el: "#mimController_DashviewList",

    collection: new DasviewList(),
    itemView: DashviewItemView,
    
    initialize: function() 
    {
        this.collection.fetch();
    },
});















/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * MiM controler
 */

DebugGraphData = function()
{
	return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]};
};







var mimController = new function()
{
	// Backbone Views
	this.dashviewsListView = null;

	// Backbone Model
	this.dashviews = null;


	this.gridster = null;
	this.widgets = null;


	// Init
	this.initView = function ()
	{
		this.dashviewsListView = new DashviewsListView();
		this.dashviews = this.dashviewsListView.collection;

		mimController.gridster = $(".gridster ul").gridster(
		{
			resize: 
			{
				enabled:true,
				max_size:[4,4],
				min_size: [1,1],

				stop: function (event, eventUISource, widget) 
				{
					var newHeight = this.resize_coords.data.height;
					var newWidth = this.resize_coords.data.width;

					mimController.redrawWidgetID(widget[0], newHeight, newWidth);
				}
			}
		}).data('gridster');
	};


	// Display dashview
	this.displayDashview = function(dashviewID)
	{
		// Clean the dashview canvas
		mimController.gridster.remove_all_widgets();
		mimController.widgets = {};

		// get
		$.getJSON('/api/dashviews/'+dashviewID, function(json, textStatus) 
		{
			if (textStatus=='success')
			{
				// Get widgets
				var widgets = json.results.widgets;

				// Display
				$.each(widgets, function(index, obj) 
				{
					// DEBUG ---------------------------------------
					obj.options = {animation:false, showTooltips: false, responsive: true, maintainAspectRatio: false};
					if (obj.id == "540c4c72037ffe341b64b536")
						obj.layout = {"col":1,"row":1,"size_x":1,"size_y":2};
					else if (obj.id == "540c4c72037ffe341b64b538")
						obj.layout = {"col":3,"row":1,"size_x":2,"size_y":1};
					else
						obj.layout = {"col":index,"row":index,"size_x":1,"size_y":1};
					// DEBUG ---------------------------------------



					// Create id of the chart
					var name = "w"+obj.id;

					// Build Canvas and add it to DOM
					var elmt = mimController.gridster.add_widget(
						'<li class="new gs-w" data-max-size-y="6", data-max-size-x="4"><canvas id="'+name+'"></canvas><span class="gs-resize-handle gs-resize-handle-both"></span></li>'
						,obj.layout["size_x"]
						,obj.layout["size_y"]
						,obj.layout["col"] 
						,obj.layout["row"]);

					// Get drawing context for the chart
					var ctx  = elmt[0].firstChild.getContext("2d");

					// Display chart
					mimController.widgets[name] = {chartType: obj.chart_type, datas: obj.datas, options: obj.options};
					eval("new Chart(ctx)." + obj.chart_type + "(obj.datas, obj.options);");
				});
			}
			else
			{
				alert("Error - Unable to get data of dashview : " + dashviewID + "\n\n" + textStatus);
			}
		});
	};


	this.redrawWidgetID = function(widget, newHeight, newWidth)
	{
		// To force redraw of the chart, need to recreate the canvas and chart
		var id = widget.firstChild.id;
		widget.firstChild = '<canvas id="'+id+'"></canvas>';
		var ctx = widget.firstChild.getContext("2d");

		eval("new Chart(ctx)." + mimController.widgets[id].chartType + "(mimController.widgets[id].datas, mimController.widgets[id].options);");

		/* 
		// Ne fonctionne pas... dommage c'était plus propre

		var canvas = widget.firstChild;
		canvas.width = newWidth - 10;
		canvas.height = newHeight - 10;
		canvas.style = "width: " + canvas.width + "px; height: " + canvas.height + "px;"
		mimController.widgets[canvas.id].resize();
		*/
	};

};
