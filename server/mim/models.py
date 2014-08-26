from mongoengine import *
from datetime import datetime
import uuid
from bson.objectid import ObjectId


class User(Document):
	email       = EmailField(required=True)
	nickname    = StringField(required=True, max_length=50)
	password    = StringField(required=True, max_length=255) 


class Comment(EmbeddedDocument):
	id          = ObjectIdField(required=True,default=ObjectId())
	owner 		= ReferenceField(User)
	created 	= DateTimeField(default=datetime.now)
	comment 	= StringField(max_length=255)	

# ''' https://github.com/Kozea/pygal/blob/master/pygal/config.py ''' 
# class Config(DynamicEmbeddedDocument):
# 	width        = IntField()
# 	height 		 = IntField()
# 	x_title      = StringField()
# 	y_title 	 = StringField()

class DashView(Document):
	owner 		= ReferenceField(User)
	title  		= StringField(default ="No Title", max_length=50)
	description = StringField(max_length=255)	
	created 	= DateTimeField(default=datetime.now)

class Widget(Document):
	dashview    = ReferenceField(DashView, required=True)
	title       = StringField()
	description = StringField(max_length=255)	
	comments    = ListField(EmbeddedDocumentField(Comment))
	config      = DictField()
	source      = URLField()
	datas       = ListField(DictField())






