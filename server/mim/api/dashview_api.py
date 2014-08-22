
from flask import *
from mim.models import *
from mim.ext import *
dashview_api = Blueprint("dashview_api", __name__)

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


@dashview_api.route("/dashviews", methods = ["GET"])
def list():
	dashviews = toDict(DashView.objects.all()) 
	dashviews = add_widget_count(dashviews)
	return SuccessResponse(dashviews)


""" Create a User
"""
@dashview_api.route("/dashviews", methods=["POST"])
def create():
	try:
		view = View.from_json(request.data)
		view.save()
	except Exception, e:
		return ErrorResponse(e.message,600)
	else: 
		SuccessResponse(json.dumps({"id":str(user.pk)}))


""" Get a User
"""		
@dashview_api.route("/dashviews/<string:dashview_id>", methods = ["GET"])
def get(dashview_id):
	try:
		dashview = DashView.objects.get(id=dashview_id)
	except Exception,e:
		return ErrorResponse(e.message, 600)
	else:
		return SuccessResponse(toDict(dashview))

	

