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
            return "javascript:mimControler.displayDashview('" + this.get("id") + "');";
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
    el: "#mimControler_DashviewList",

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







var mimControler = new function()
{
	this.DashviewsListView = null;
	this.Dashviews = null;
	var gridster = null;

	// Init
	this.initView = function ()
	{
		this.DashviewsListView = new DashviewsListView();
		this.Dashviews = this.DashviewsListView.collection;

		// Check http://gridster.net/demos/resize-limits.html
	    gridster = $(".gridster ul").gridster(
	    	{


	    		resize: {
	    			enabled:true,
	    			max_size:[4,4],
	    			min_size: [1,1]
	    		}
	    	}


	    	).data('gridster');

	};


	// Display dashview
	this.displayDashview = function(dashviewID)
	{
		// Clean the dashview canvas
		gridster.remove_all_widgets();

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
					// Create id of the chart
					var name = "chart"+index;

					// Build Canvas and add it to DOM
					var elmt = gridster.add_widget('<li class="new gs-w" data-max-size-y="6", data-max-size-x="2"><canvas id="'+name+'" width="390" height="200"></canvas><span class="gs-resize-handle gs-resize-handle-both"></span></li>', 1, 1);

					// Get drawing context for the chart
					var ctx  = elmt[0].firstChild.getContext("2d")

					// Display chart
					obj.options = {animation:false, showTooltips : false};
					var myLineChart = eval("new Chart(ctx)." + obj.chart_type + "(obj.datas, obj.options);");
				});
			}
			else
			{
				alert("Error - Enable to get data of dashview : " + dashviewID + "\n\n" + textStatus);
			}
		});


		
	};
};
