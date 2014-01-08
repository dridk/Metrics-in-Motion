from tastypie.resources import ModelResource
from mim.models import *

class ViewResource(ModelResource):
	class Meta:
		queryset = View.objects.all()
		resource_name = "view"

