# -*- coding: utf-8 -*-
from flask import jsonify, Response
from pymongo import cursor
from bson import json_util
import json

''' MongoDB return _id as ObjectID. Which is not parsable as json
Those methods convert ObjectID to stringID and also date. Indeed, ObjectID contains 
also the created date ''' 

''' This function parse a dict python '''
def parseObjectId(data):
	if "_id" in data:
		data["created"] = data["_id"].generation_time
		data["id"] = str(data["_id"])
		del data["_id"]
	return data

''' This function parse a list of dict ''' 
def parseObjectIds(data):
	for i in range(len(data)):
		data[i] = parseObjectId(data[i])
	return data




def SuccessResponse(data = None):
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

	