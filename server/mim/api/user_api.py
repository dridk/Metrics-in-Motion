
from flask import *
from mim.models import *
from mim.ext import *

user_api = Blueprint("user_api", __name__)

""" Get Users Collections 
"""
@user_api.route("/users", methods = ["GET"])
def list():
	data = User.objects.all()
	return SuccessResponse(data.to_json())


""" Search a User by his nickname
"""
@user_api.route("/users/search/<string:nickname>", methods=["GET"])
def search(nickname):
	data = User.objects(nickname__contains=nickname)
	return SuccessResponse(data.to_json())
	
""" Search a unique user from id 
"""
@user_api.route("/users/<string:user_id>", methods = ["GET"])
def get(user_id):
	try:
		data = User.objects.get(pk=user_id)
	except Exception,e:
		return ErrorResponse(e.message, 600)
	else:
		return SuccessResponse(data.to_json())


""" Create a User
"""
@user_api.route("/users", methods=["POST"])
def create():
	try:
		user = User.from_json(request.data)
		user.save()
	except Exception, e:
		return ErrorResponse(e.message,600)
	else: 
		SuccessResponse(json.dumps({"id":str(user.pk)}))

""" Update a User
"""
@user_api.route("/users/<string:user_id>", methods=["PUT"])
def update(user_id):
	try:
		postData = json.loads(request.data)
		user = User.objects.get(pk=user_id)
	except Exception, e:
		return ErrorResponse(e.message, 600)

	if "nickname" in postData:
		user.nickname = postData["nickname"]

	if "password" in postData:
		user.nickname = postData["password"]

	try:
		user.save()
	except Exception, e:
		return ErrorResponse(e.message, 700)

	else:
		return SuccessResponse(json.dumps({"id":str(user.pk)}))


""" Delete a User
"""
@user_api.route("/users/<string:user_id>", methods=["DELETE"])
def delete(user_id):
	try:
		user = User.objects.get(pk=user_id)
		user.delete()
	except Exception, e:
		return ErrorResponse(e.message, 700)
	else:
		return SuccessResponse()

""" User login
"""
@user_api.route("/users/login", methods=["POST"])
def login():
	postData = json.loads(request.data)
	if ("email" not in postData) or ("password" not in postData):
		return ErrorResponse("Json request is not complete", 700) 
	try:
		user = User.objects.get(email=postData["email"])
	except Exception, e:
		return ErrorResponse(e.message, 700)

	else:
		if user.password == postData["password"]:
			session["current_user"] = str(user.pk)
			print session
			return SuccessResponse()
	
	session["current_user"] = None;
	return ErrorResponse("Invalid password or username", 700)

""" User logout
"""
@user_api.route("/users/logout", methods=["POST"])
def logout():
	session["current_user"] = None;
	return SuccessResponse()

""" User me 
"""
@user_api.route("/users/me", methods=["GET"])
def me():
	if (session["current_user"] is None):
		return ErrorResponse("you are not logged", 700) 
	else:
		return SuccessResponse(User.objects.get(pk=session["current_user"]).to_json())