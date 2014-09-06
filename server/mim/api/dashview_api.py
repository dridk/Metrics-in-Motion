from flask import *
from mim.models import *
from mim.ext import *
from flask.ext.restful import Resource


''' This is an extra function, which add "widget_count" key into all 
dashview results collections. 
''' 


class DashviewListAPI(Resource):
	''' Get all dashview '''

	def get(self):

		def count_widget(data):
			count = Widget.objects.no_dereference().filter(dashview=data["_id"]).count()
			data["widget_count"] = count

		dashviews = toDict(DashView.objects.all(),func_extra_info=[count_widget]) 
		return SuccessResponse(dashviews)

	''' Create a new dashview '''
	def post(self):
		try:
			dashview = DashView.from_json(request.data)
			dashview.save()
		except Exception, e:
			return ErrorResponse(e.message,600)
		else: 
			return SuccessResponse({"id":str(dashview.id)})	



class DashviewAPI(Resource):
	''' Get a specific dashview'''
	def get(self, dashview_id):
		def count_comments(data):
			data["comments_count"] = len(data["comments"])
			del data["comments"]

		try:
			dashview = DashView.objects.get(id=dashview_id)
			widgets  = Widget.objects.filter(dashview = dashview)

			data = toDict(dashview)

			data["widgets"] = toDict(widgets, func_extra_info=[count_comments])

		except Exception,e:
			return ErrorResponse(e.message, 600)
		else:
			return SuccessResponse(data)
	
	''' Update a specific dashview'''
	def put(self, dashview_id):
		try:
			postData = json.loads(request.data)
			dashview = DashView.objects.get(pk=dashview_id)

			if "title" in postData:
				dashview.title = postData["title"]
			if "description" in postData:
				dashview.description = postData["description"]
			
		except Exception, e:
			return ErrorResponse(e.message, 600)
		try:
			dashview.save()
		except Exception, e:
			return ErrorResponse(e.message, 700)

		else:
			return SuccessResponse({"id":str(dashview.pk)})
	
	''' Delete a specific dashview'''
	def delete(self, dashview_id):
		try:
			dashview = DashView.objects.get(pk=dashview_id)
			Widget.objects.filter(dashview = dashview).delete()
			dashview.delete()
		except Exception, e:
			return ErrorResponse(e.message, 700)
		else:
			return SuccessResponse()



