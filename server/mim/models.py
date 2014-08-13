from mongoengine import *
class User(Document):
	email    = EmailField(required=True)
	nickname = StringField(required=True, max_length=50)
	password = StringField(required=True, max_length=256) 


