import unittest
import requests 
import json 
from mim import *

class UserTest(unittest.TestCase):

	def setUp(self):
		for i in range(5):
		    user = User()
		    user.email = "testing%s@labsquare.org" % i
		    user.username = "testing"
		    user.password = "testing"
		    user.save()

	def tearDown(self):
		User.objects.filter(username="testing").delete()


	def is_user(self,data):
		self.assertIn("id",data)
		self.assertIn("email",data)
		self.assertIn("username",data)
		self.assertNotIn("password",data)


	def get_first_user_id(self):
		user = User.objects.filter(username="testing").first()
		return str(user.id)

	def test_get_user_list(self):
		data = requests.get(UserTest.url + "users").text 
		array = json.loads(data)
		self.assertIn("results",array)
		for user in array["results"]:
			self.is_user(user)

	def test_get_user(self):
		user_id = self.get_first_user_id()
		data = requests.get(UserTest.url + "users/" + user_id ).text
		array = json.loads(data)
		self.is_user(array["results"])

	def test_post_user(self):
		payload = {"email":"testing@labsquare.org", "username":"test", "password":"pass"}
		headers = {'content-type': 'application/json'}
		data =requests.post(UserTest.url + "users",
		 					data=json.dumps(payload),
		  					headers=headers).text 

		
		array = json.loads(data)
		self.assertIn("success",array)
		self.assertTrue(array["success"], "success equal false")
		self.assertIn("id",array["results"])


	def test_delete_user(self):
		user_id = self.get_first_user_id()
		data =requests.delete(UserTest.url + "users/" + user_id).text
		array = json.loads(data)
		self.assertIn("success",array)

	def test_update_user(self):
		user_id = self.get_first_user_id()
		payload = {"email":"testingUPDATED@labsquare.org"}
		headers = {'content-type': 'application/json'}

		data =requests.put(UserTest.url + "users/" + user_id, 
							 data = json.dumps(payload),
							 headers = headers).text

		array = json.loads(data)

		self.assertIn("success",array)
		self.assertTrue(array["success"], "success equal false")
		
		updatedUser = User.objects.get(pk=user_id)

		


