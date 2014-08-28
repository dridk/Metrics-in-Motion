from mongoengine import *
from datetime import datetime
import uuid
from bson.objectid import ObjectId

CHART_TYPE = ["Line","Bar","Radar","PolarArea","Pie","Doughnut"]

class User(Document):
	email       = EmailField(required=True)
	username    = StringField(required=True, max_length=50)
	password    = StringField(required=True, max_length=255) 


class Comment(EmbeddedDocument):
	id          = ObjectIdField(required=True,default=ObjectId())
	owner 		= ReferenceField(User)
	created 	= DateTimeField(default=datetime.now)
	comment 	= StringField(max_length=255)	

class DashView(Document):
	owner 		= ReferenceField(User)
	title  		= StringField(default ="No Title", max_length=50)
	description = StringField(max_length=255)	
	created 	= DateTimeField(default=datetime.now)

class Datas(DynamicEmbeddedDocument):
	pass

class Widget(Document):
	dashview    = ReferenceField(DashView, required=True)
	title       = StringField()
	chart       = StringField(choices=CHART_TYPE)
	description = StringField(max_length=255)
	style       = StringField()	
	comments    = ListField(EmbeddedDocumentField(Comment))
	config      = DictField()
	datas       = EmbeddedDocumentField(Datas)





