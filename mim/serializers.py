from rest_framework import serializers
from mim.models import *


class ViewSerializer(serializers.ModelSerializer):
	class Meta:
		model = View



class WidgetSerializer(serializers.ModelSerializer):
	view = ViewSerializer(required=False)

	class Meta:
		model = Widget

