from schematics.models import Model 
from schematics.types import *

class User(Model):
	email    = EmailType(required  = True)
	password = StringType(required = True)