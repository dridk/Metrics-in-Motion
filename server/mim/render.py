import pygal
import json 
import models

def getConfig(widget):
	if not isinstance(widget, models.Widget):
		raise TypeError("ChartConfig require %s" % (str(models.Widget)))

	if not hasattr(widget,"config"):
		raise AttributeError("no config Document define in widget Document")

	config = pygal.Config()
	for key in widget.config:
		setattr(config,key, widget.config[key])

	return config

	



def toChart(widget):
	if not isinstance(widget, models.Widget):
		raise TypeError("toChart require %s" % (str(models.Widget)))

	chart  = eval("pygal."+widget.chart_type+"()")
	chart.config = getConfig(widget) 
	chart.add('line 1', [5, 15, 10, 8])
	chart.add('line 2', [15, 20, 8, 11])

	return chart
	
