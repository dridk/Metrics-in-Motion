
from flask import *
from mim.models import *
from mim.ext import *
dashview_api = Blueprint("dashview_api", __name__)


@dashview_api.route("/dashviews", methods = ["GET"])
def list():
#Count how many widgets they are are
	ids = {}
	for widget in Widget.objects.all():
		key = str(widget.dashview.id)
		if key not in ids:
 			ids[key]=1
 		else:
 			ids[key]+=1

#Get the dashviews list
	dashviews = collection2List(DashView.objects.all()) 
#Loop over dashviews and add widget_count key / value
	for index in range(len(dashviews)):
		key = dashviews[index]["id"]
		print key
		if key in ids:
			dashviews[index]["widgets_count"] = ids[key]

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
