# -*- coding: utf-8 -*-
from flask import jsonify

def SuccessResponse(data):
	json = {"success":True, "result":data}
	return jsonify(json)

def ErrorResponse(message, code):
	json = {"success":False, "msg":message, "error_code":code}
	response = jsonify(json)
	response.status_code = 400 
	return response

	