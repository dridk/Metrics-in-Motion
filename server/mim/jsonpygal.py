import pygal
import json 

class JsonConfig(pygal.Config):
	def __init__(self, data):
		for key, value in json.loads(data).items():
			setattr(self, key, value)

