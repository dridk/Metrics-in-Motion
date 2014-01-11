from rest_framework import serializers
from django.contrib.auth.models import User
from mim.models import *



class TestSerializer(serializers.Serializer):
	name = serializers.CharField()


	

class WidgetSerializer(serializers.ModelSerializer):
	view = serializers.RelatedField()
	class Meta:
		model = Widget


class ViewSerializer(serializers.ModelSerializer):
	
	widgets = WidgetSerializer()
	user = serializers.RelatedField()
	class Meta:
		model = View
		fields = ('id','title','description','user','widgets')



class UserSerializer(serializers.ModelSerializer):
	views = serializers.PrimaryKeyRelatedField(many=True)
	class Meta:
		model = User
		fields = ('id','username','first_name','last_name','email','last_login','date_joined','views')
		
