from mim.models import *
from mim.serializers import *
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status,viewsets
from django.http import *






class UserViewSet(viewsets.ViewSet):

	def perform_authentication(self, request):
		pass

	def create(self,request):
		return Response("User Created")

	def list(self,request):
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, id):
		user = get_object_or_404(User, pk=id)
		serializer = UserSerializer(user)
		return Response(serializer.data)




class DashboardViewSet(viewsets.ViewSet):

	def perform_authentication(self, request):
		pass


	def create(self,request,user_id):
		view = View();
		view.title = request.DATA["title"]
		view.description = request.DATA["description"]
		# view.style = request.DATA["style"]
		view.user_id = user_id
		view.save()
		return Response(view.id)

	def list(self,request,user_id):
		views = View.objects.filter(user_id=user_id)
		serializer = ViewSerializer(views)
		return Response(serializer.data)

	def retrieve(self,request,user_id, id):
		views = View.objects.filter(user_id=user_id)
		view  = get_object_or_404(views,pk=id)
		serializer = ViewSerializer(view)
		return Response(serializer.data)









