import unittest
import requests 
import json 
import mim

class DashViewTest(unittest.TestCase):
	def setUp(self):
		mim.app.config['TESTING'] = True
		self.app = mim.app.test_client()
		user = mim.models.User(email="testing@labsquare.org", password="", username="testing")
		user.save()
		for i in range(5):
		    dashview = mim.models.DashView()
		    dashview.owner = user 
		    dashview.title = "test"
		    dashview.description = "test"
		    dashview.save()
        

	def tearDown(self):
		mim.models.User.objects.filter(username="testing").delete()
		mim.models.DashView.objects.filter(title="test").delete()

	def is_dashview(self,data):
		self.assertIn("id",data)
		self.assertIn("created",data)
		self.assertIn("title",data)
		self.assertIn("description",data)
		self.assertIn("owner",data)
		
	def get_dashview_id(self):
		return str(mim.models.DashView.objects.filter(title="test").first().id)


	def test_get_dashview_list(self):
		data = self.app.get("/api/dashviews").data 
		array = json.loads(data)
		self.assertIn("results",array)
		for view in array["results"]:
			self.is_dashview(view)

	def test_get_dashview(self):
		view_id = self.get_dashview_id()
		data = self.app.get("/api/dashviews/" + view_id).data 
		array = json.loads(data)
		self.is_dashview(array["results"])