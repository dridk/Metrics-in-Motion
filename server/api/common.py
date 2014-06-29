# -*- coding: utf-8 -*-
from flask import jsonify, Response
from pymongo import cursor
from bson import json_util
import json


def SuccessResponse(data = None):

	if type(data) == cursor.Cursor:
		data = json.loads(json_util.dumps(data))


	if data is None:
		results = {"success":True}
	else:
		results = {"success":True, "result":data}

	return jsonify(results)

def ErrorResponse(message, code):
	json = {"success":False, "msg":message, "error_code":code}
	response = jsonify(json)
	response.status_code = 400 
	return response

	