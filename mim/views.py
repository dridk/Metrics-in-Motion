from mim.models import *
from mim.serializers import *
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status,viewsets


class UserViewSet(viewsets.ViewSet):
	def list(self,request):
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, id):
		user = get_object_or_404(User, pk=id)
		serializer = UserSerializer(user)
		return Response(serializer.data)

	def list_view(self,request, id):
		views = View.objects.filter(user_id=id)
		serializer = ViewSerializer(views)
		return Response(serializer.data)

	def retrieve_view(self,request, id, view_id):
		views = View.objects.filter(user_id=id)
		view  = get_object_or_404(views,pk=view_id)
		serializer = ViewSerializer(view)
		return Response(serializer.data)










