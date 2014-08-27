from flask import Response, jsonify
import base64
from mongoengine import *
from mongoengine.base.datastructures import BaseList # Allow comments conversion
import json 
from serializer import MongoEngineSerializer

'''Return a success Response 
Take json data as arguments
'''
def SuccessResponse(data = None):
	if data is None:
		results = {"success":True}
	else:
		results = {"success":True, "results":data}
	return results


'''Return an error Response 
Take message and de status code 
'''
def ErrorResponse(message, code):
	json = {"success":False, "msg":message, "error_code":code}
	return json


def toDict(mongodata, **args):
	res = []
	inject = []
	exclude = []
	func_generic_extra_info = []
	func_extra_info = []

	print args 

	if "res" in args:
		res = args["res"]

	if "inject" in args:
		inject = args["inject"]

	if "exclude" in args:
		print "YAAA"
		exclude = args["exclude"]

	if "func_generic_extra_info" in args:
		func_generic_extra_info = args["func_generic_extra_info"]

	if "func_extra_info" in args:
		func_extra_info = args["func_extra_info"]


	print exclude
	res = MongoEngineSerializer(inject,exclude,func_generic_extra_info,func_extra_info).dumps(mongodata)
	
	return res

''' encode objectID to base64 id to make it smaller 
'''
def encodeId(id):
	if isinstance(id,ObjectId):
		return base64.urlsafe_b64encode(id.binary)
	else:
		raise TypeError("encodeId take ObjectId as arguments")

''' decode base64 id to objectID 
'''
def decodeId(id):
	if isinstance(id,string):
		return ObjectId(base64.urlsafe_b64decode(string))
	else:
		raise TypeError("encodeId take str as arguments")