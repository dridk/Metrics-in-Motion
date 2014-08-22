
from flask import *
from mim.models import *
from mim.ext import *
from mim import render
from flask import send_file

widget_api = Blueprint("widget_api", __name__)

""" Get Users Collections 
"""
@widget_api.route("/widgets/<string:widget_id>/image.svg", methods = ["GET"])
def test(widget_id):
	widget = Widget.objects.first()
	chart = render.toChart(widget)
	return Response(chart.render(), mimetype="image/svg+xml")

""" Get Users Collections 
"""
@widget_api.route("/widgets/<string:widget_id>/image.png", methods = ["GET"])
def test2(widget_id):
	widget = Widget.objects.first()
	chart = render.toChart(widget)

	filename = "%s.png" % widget_id

	print filename

	chart.render_to_png("mim/cache/"+filename)

	return send_file("cache/"+filename, mimetype='image/png')