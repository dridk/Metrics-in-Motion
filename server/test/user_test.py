import unittest
import requests 
import json 


class UserTest(unittest.TestCase):

	def is_user(self,data):
		self.assertIn("id",data)
		self.assertIn("email",data)
		self.assertIn("username",data)
		self.assertIn("password",data)

	def get_first_user_id(self):
		data = requests.get(UserTest.url + "users").text 
		array = json.loads(data)
		user_id = array["results"][0]["id"]
		return user_id

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
		

