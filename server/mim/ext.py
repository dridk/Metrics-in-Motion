from flask import Response, jsonify
from mongoengine import *
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

#Helper function to parse MongoDocument to Python object, and then to json
#Thanks to jason-w / gist:4969476

def mongo_to_dict(obj, exclude_fields = []):
	return_data = []

	if obj is None:
		return None

	if isinstance(obj, Document):
		return_data.append(("id",str(obj.id)))

	for field_name in obj._fields:
		if field_name in exclude_fields:
			continue

		if field_name in ("id",):
			continue

		data = obj._data[field_name]

		if isinstance(obj._fields[field_name], ListField):
			return_data.append((field_name, list_field_to_dict(data)))
		elif isinstance(obj._fields[field_name], EmbeddedDocumentField):
			return_data.append((field_name, mongo_to_dict(data,[])))
		elif isinstance(obj._fields[field_name], DictField):
			return_data.append((field_name, data))
		else:
			return_data.append((field_name, mongo_to_python_type(obj._fields[field_name],data)))

	return dict(return_data)

def list_field_to_dict(list_field):
	return_data = []
	for item in list_field:
		if isinstance(item, EmbeddedDocument):
			return_data.append(mongo_to_dict(item,[]))
		else:
			return_data.append(mongo_to_python_type(item,item))
	return return_data


def mongo_to_python_type(field,data):

	if isinstance(field, DateTimeField):
		return str(data.isoformat())
	elif isinstance(field, ComplexDateTimeField):
		return field.to_python(data).isoformat()
	elif isinstance(field, StringField):
		return str(data)
	elif isinstance(field, FloatField):
		return float(data)
	elif isinstance(field, IntField):
		return int(data)
	elif isinstance(field, BooleanField):
		return bool(data)
	elif isinstance(field, ObjectIdField):
		return str(data)
	elif isinstance(field, DecimalField):
		return data
	else:
		return str(data)

def document2Dict(document):
	return mongo_to_dict(document)

def collection2List(collection):
	return_data = []
	for document in collection:
		return_data.append(document2Dict(document))
	return return_data



