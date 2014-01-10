from rest_framework import serializers
from mim.models import *


class ViewSerializer(serializers.ModelSerializer):
	class Meta:
		model = View
		fields = ("id", "title","description")


class WidgetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Widget
		field = ("id","title","description","col","row","width","height")