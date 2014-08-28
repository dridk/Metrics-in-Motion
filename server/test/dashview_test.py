import unittest
import requests 
import json 
from mim import *

class DashViewTest(unittest.TestCase):


	def is_dashview(self,data):
		self.assertIn("id",data)
		self.assertIn("created",data)
		self.assertIn("title",data)
		self.assertIn("description",data)
		self.assertIn("owner",data)
		
	def get_dashview_id(self):
		return str(DashView.objects.filter(title="test").first().id)


	def setUp(self):
		user = User(email="testing@labsquare.org", password="", username="testing")
		user.save()
		for i in range(5):
		    dashview = DashView()
		    dashview.owner = user 
		    dashview.title = "test"
		    dashview.description = "test"
		    dashview.save()


	def tearDown(self):
		User.objects.filter(username="testing").delete()
		DashView.objects.filter(title="test").delete()


	def test_get_dashview_list(self):
		data = requests.get(DashViewTest.url + "dashviews").text 
		array = json.loads(data)
		self.assertIn("results",array)
		for view in array["results"]:
			self.is_dashview(view)

	def test_get_dashview(self):
		view_id = self.get_dashview_id()
		data = requests.get(DashViewTest.url + "dashviews/" + view_id).text 
		array = json.loads(data)
		self.is_dashview(array)