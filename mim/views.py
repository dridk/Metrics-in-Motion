from mim.models import *
from mim.serializers import *
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status,viewsets
from django.http import *
from rest_framework.exceptions import *
from rest_framework import status
import json


# =======================================================
class UserResource(viewsets.ViewSet):
	""" User Resource """


	def perform_authentication(self, request):
		pass

	def list(self,request):
		"""Gets a list of users """
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self,request,pk=None):
		"""Gets a user """
		queryset = User.objects.all()
		user = get_object_or_404(queryset,pk=pk)
		serializer = UserSerializer(user)
		return Response(serializer.data)




# =======================================================

class DashboardResource(viewsets.ViewSet):

	def perform_authentication(self, request):
		pass


	def create(self,request,user_id):
		"""Create a new dashboard for the user"""
		v = View()
		v.title = request.DATA["title"]
		v.description = request.DATA["description"]
		v.user_id = user_id
		v.save()
		return Response({"result":"success"})


	def list(self,request,user_id):
		"""Gets a list of dashboard from the user """

		views = View.objects.filter(user_id=user_id)
		serializer = ViewSerializer(views)
		return Response(serializer.data)

	def retrieve(self,request,user_id, pk):
		""" Gets a dashboard from the user """
		views = View.objects.filter(user_id=user_id)
		view  = get_object_or_404(views,pk=pk)
		serializer = ViewSerializer(view)
		return Response(serializer.data)

	def destroy(self, request, user_id, pk):
		""" Destroy a dashboard from the user """
		views = View.objects.filter(user_id=user_id)
		view  = get_object_or_404(views,pk=pk)
		view.delete()
		return Response({"success":"true"})

# =======================================================

class WidgetResource(viewsets.ViewSet):

	def perform_authentication(self, request):
		pass


	def create(self,request,user_id, view_id):
		"""Create a new dashboard for the user"""
		w = Widget()
		w.title = request.DATA["title"]
		w.description = request.DATA["description"]
		w.row = request.DATA["row"]
		w.col = request.DATA["col"]
		w.width = request.DATA["width"]
		w.height = request.DATA["height"]
		w.spec = request.DATA["spec"]
		w.view_id = view_id
		w.save()
		return Response({"result":"success"})

	def list(self,request,user_id,view_id):
		widgets = Widget.objects.filter(view_id = view_id)
		serializer = WidgetSerializer(widgets)
		return Response(serializer.data)

	def retrieve(self,request,user_id, view_id, pk):
		""" Gets a widgets from the dashboard """
		widgets = Widget.objects.filter(view_id=view_id)
		widget  = get_object_or_404(widgets,pk=pk)
		serializer = WidgetSerializer(widget)
		return Response(serializer.data)

	def destroy(self, request, user_id, view_id, pk):
		""" Destroy a widgets from the dashboard """
		widgets = View.objects.filter(view_id=view_id)
		widget  = get_object_or_404(views,pk=pk)
		widget.delete()
		return Response({"success":"true"})	


# class UserViewSet(viewsets.ViewSet):

# 	def perform_authentication(self, request):
# 		pass

# 	def create(self,request):
# 		return Response("User Created")

# 	def list(self,request):
# 		queryset = User.objects.all()
# 		serializer = UserSerializer(queryset, many=True)
# 		return Response(serializer.data)

# 	def retrieve(self, request, id):
# 		user = get_object_or_404(User, pk=id)
# 		serializer = UserSerializer(user)
# 		return Response(serializer.data)




# class DashboardViewSet(viewsets.ViewSet):

# 	def perform_authentication(self, request):
# 		pass


# 	def create(self,request,user_id):
# 		view = View();
# 		view.title = request.DATA["title"]
# 		view.description = request.DATA["description"]
# 		# view.style = request.DATA["style"]
# 		view.user_id = user_id
# 		view.save()
# 		return Response(view.id)

# 	def list(self,request,user_id):
# 		views = View.objects.filter(user_id=user_id)
# 		serializer = ViewSerializer(views)
# 		return Response(serializer.data)

# 	def retrieve(self,request,user_id, id):
# 		views = View.objects.filter(user_id=user_id)
# 		view  = get_object_or_404(views,pk=id)
# 		serializer = ViewSerializer(view)
# 		return Response(serializer.data)









