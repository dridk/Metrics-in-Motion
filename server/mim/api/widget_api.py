from flask import *
from mim.models import *
from mim.ext import *
from flask.ext.restful import Resource

class WidgetAPI(Resource):
	''' Get a specific widget'''
	def get(self, widget_id):
		print "GET WIDGETS"
		try:
			widget = Widget.objects.get(id=widget_id)
			data = toDict(widget)
			data["comments_count"] = len(data["comments"])
			del data["comments"]
		except Exception,e:
			return ErrorResponse(e.message, 600)
		else:
			return SuccessResponse(data)
	
	''' Update a specific widget'''
	def put(self, widget_id):
		try:
			postData = json.loads(request.data)
			widget = Widget.objects.get(pk=widget_id)
		except Exception, e:
			return ErrorResponse(e.message, 600)
		try:
			widget.save()
		except Exception, e:
			return ErrorResponse(e.message, 700)

		else:
			return SuccessResponse({"id":str(widget.pk)})
	
	''' Delete a specific widget'''
	def delete(self, widget_id):
		try:
			widget = Widget.objects.get(pk=widget_id)
			widget.delete()
		except Exception, e:
			return ErrorResponse(e.message, 700)
		else:
			return SuccessResponse()



