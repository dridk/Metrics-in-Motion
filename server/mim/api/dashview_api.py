from flask import *
from mim.models import *
from mim.ext import *
from flask.ext.restful import Resource


''' This is an extra function, which add "widget_count" key into all 
dashview results collections. 
''' 
def add_widget_count(collection):
	#Create a dictionnary [dashview_id] = count
	ids = {}
	for widget in Widget.objects.all():
		key = str(widget.dashview.id)
		if key not in ids:
 			ids[key]=1
 		else:
 			ids[key]+=1

#Loop over the collection and add widget_count key and value
	for index in range(len(collection)):
		key = collection[index]["id"]
		print key
		if key in ids:
			collection[index]["widgets_count"] = ids[key]
	return collection


class DashviewListAPI(Resource):
	''' Get all dashview '''

	def get(self):
		dashviews = toDict(DashView.objects.all()) 
		dashviews = add_widget_count(dashviews)
		return SuccessResponse(dashviews)

	''' Create a new dashview '''
	def post(self):
		try:
			dashview = DashView.from_json(request.data)
			dashview.save()
		except Exception, e:
			return ErrorResponse(e.message,600)
		else: 
			SuccessResponse({"id":dashview.id})	
		

class DashviewAPI(Resource):
	''' Get a specific dashview'''
	def get(self, dashview_id):
		try:
			data = DashView.objects.get(pk=dashview_id)
		except Exception,e:
			return ErrorResponse(e.message, 600)
		else:
			return SuccessResponse(toDict(data))
	
	''' Update a specific dashview'''
	def put(self, dashview_id):
		try:
			postData = json.loads(request.data)
			dashview = DashView.objects.get(pk=dashview_id)
		except Exception, e:
			return ErrorResponse(e.message, 600)
		try:
			dashview.save()
		except Exception, e:
			return ErrorResponse(e.message, 700)

		else:
			return SuccessResponse({"id":str(dashview.pk)})
	
	''' Delete a specific dashview'''
	def delete(self, user_id):
		try:
			dashview = DashView.objects.get(pk=user_id)
			dashview.delete()
		except Exception, e:
			return ErrorResponse(e.message, 700)
		else:
			return SuccessResponse()



