from tastypie.resources import ModelResource
from tastypie import fields
from mim.models import *
from django.contrib.auth.models import User

# ======= Widget Resources =========
class WidgetResource(ModelResource):
	view = fields.ToOneField("mim.api.ViewResource", "view", full=False)
	class Meta:
		queryset = Widget.objects.all()
		resources_name = "widget"

 	def alter_list_data_to_serialize(self, request, data_dict):	
 		print "SACHAAAAA"
 		meta =  data_dict["meta"]
 		del(data_dict["meta"])
 		data_dict["test"] = meta
		return data_dict

# ======= View Resources =========
 
class ViewResource(ModelResource):
	widgets = fields.ToManyField(WidgetResource, "widget_set", full=True)
	user = fields.ToOneField("mim.api.UserResource", "user", full=True)
	class Meta:
		queryset = View.objects.all()
		resource_name = "view"
		#filtering = {"user":"exact"}

# ======= User Resources =========

class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = "user"
		excludes = ["email", "is_active","is_staff","is_superuser", "password"]
		include_resource_uri = False



