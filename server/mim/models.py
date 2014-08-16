from mongoengine import *
from datetime import datetime
import uuid

class User(Document):
	email       = EmailField(required=True)
	nickname    = StringField(required=True, max_length=50)
	password    = StringField(required=True, max_length=255) 


class Comment(EmbeddedDocument):
	id          = UUIDField(binary=False, default=uuid.uuid4())
	owner 		= ReferenceField(User)
	created 	= DateTimeField(default=datetime.now)
	comment 	= StringField(max_length=255)	


class Vega(DynamicEmbeddedDocument):
	pass

class Widget(EmbeddedDocument):
	id          = UUIDField(binary=False, default=uuid.uuid4())
	title  		= StringField(default ="No Title", max_length=50)
	description = StringField(max_length=255)	
	comments    = ListField(EmbeddedDocumentField(Comment))
	vega        = EmbeddedDocumentField(Vega)


class DashView(Document):
	owner 		= ReferenceField(User)
	title  		= StringField(default ="No Title", max_length=50)
	description = StringField(max_length=255)	
	created 	= DateTimeField(default=datetime.now)
	widgets 	= ListField(EmbeddedDocumentField(Widget))


