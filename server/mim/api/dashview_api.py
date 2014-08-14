
from flask import *
from mim.models import *
from mim.ext import *

dashview_api = Blueprint("dashview_api", __name__)


@dashview_api.route("/dashviews", methods = ["GET"])
def list():
	data = DashView.objects.all().to_json()
	return SuccessResponse(data)


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
