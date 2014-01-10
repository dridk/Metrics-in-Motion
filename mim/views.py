from mim.models import *
from mim.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ViewList(APIView):
	def get(self,request,format=None):
		views = View.objects.all()
		serializer = ViewSerializer(views,many=True)
		return Response(serializer.data)




class WidgetList(APIView):
	def get(self,request,format=None):
		widgets = Widget.objects.all()
		serializer = WidgetSerializer(widgets,many=True)
		return Response(serializer.data)

