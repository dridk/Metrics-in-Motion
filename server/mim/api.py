from flask import *
from models import *
from ext import *

api = Blueprint("api", __name__)

@api.route("/users", methods = ["GET"])
def list():
	data = User.objects.all().to_json()
	return SuccessResponse(data)


@api.route("/users", methods=["POST"])
def create():
	try:
		user = User.from_json(request.data)
		user.save()
	except Exception, e:
		return ErrorResponse(e.message,600)
	else: 
		SuccessResponse({"id":str(user.index)})


