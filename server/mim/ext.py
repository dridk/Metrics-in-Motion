from flask import Response, jsonify
import json 

'''Return a success Response 
Take json data as arguments
'''
def SuccessResponse(data = None):
	if data is None:
		results = {"success":True}
	else:
		results = {"success":True, "results": json.loads(data)}
	return jsonify(results)


'''Return an error Response 
Take message and de status code 
'''
def ErrorResponse(message, code):
	json = {"success":False, "msg":message, "error_code":code}
	response = jsonify(json)
	response.status_code = 400 
	return response