# -*- coding: utf-8 -*-

from flask import * 
from common import *
from model import User
from bson import json_util
import json
resource = Blueprint("user_api", __name__)

"""Get Users Collections
"""
@resource.route("/users", methods=["GET"])
def users():
	data = current_app.db.users.find({}, {"views":0, "_id":0})
	return SuccessResponse(data)

"""Search Users from keywords
"""
@resource.route("/users/search/<string:keyword>", methods=["GET"])
def search(keyword):
	data = current_app.db.users.find({"email":{"$regex":'^'+keyword}}, {"_id":True, "email":True})
	return SuccessResponse(list(data))

"""Search unique user from id 
"""
@resource.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
	data = current_app.db.users.find_one({"_id":user_id}, {"email":True})
	print(data["email"])
	return SuccessResponse(data)

"""Create user
"""
@resource.route("/users", methods=["POST"])
def post_user():

	user = User(json.loads(request.data))

	try:
		user.validate()
	except Exception, e:
		return ErrorResponse(e.message,600)
	else:
		current_app.db.users.insert(user.to_primitive())
		return "yes"


	