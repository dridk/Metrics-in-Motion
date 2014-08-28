import unittest
import requests 
import json 
import mim

class UserTest(unittest.TestCase):
	def setUp(self):
		mim.app.config['TESTING'] = True
		self.app = mim.app.test_client()
		for i in range(5):
			user = mim.models.User()
			user.email = "testing%s@labsquare.org" % i
			user.username = "testing"
			user.password = "testing"
			user.save()
        

	def tearDown(self):
		pass


	def is_user(self,data):
		self.assertIn("id",data)
		self.assertIn("email",data)
		self.assertIn("username",data)
		self.assertNotIn("password",data)


	def get_first_user_id(self):
		user = mim.models.User.objects.filter(username="testing").first()
		return str(user.id)


	def check_json_error(self,data):
		if "message" in data:
			raise Warning("JSON message : " + data["message"])


	def test_get_user_list(self):
		response = self.app.get("/api/users")
		array = json.loads(response.data)
		self.assertIn("results",array)
		for user in array["results"]:
			self.is_user(user)


	def test_get_user(self):
		user_id = self.get_first_user_id()
		data = self.app.get("/api/users/" + user_id ).data
		array = json.loads(data)
		self.check_json_error(array)

		


		

	# def test_post_user(self):
	# 	payload = {"email":"testing@labsquare.org", "username":"test", "password":"pass"}
	# 	headers = {'content-type': 'application/json'}
	# 	data =requests.post(UserTest.url + "users",
	# 	 					data=json.dumps(payload),
	# 	  					headers=headers).text 

		
	# 	array = json.loads(data)
	# 	self.assertIn("success",array)
	# 	self.assertTrue(array["success"], "success equal false")
	# 	self.assertIn("id",array["results"])


	# def test_delete_user(self):
	# 	user_id = self.get_first_user_id()
	# 	data =requests.delete(UserTest.url + "users/" + user_id).text
	# 	array = json.loads(data)
	# 	self.assertIn("success",array)

	# def test_update_user(self):
	# 	user_id = self.get_first_user_id()
	# 	payload = {"email":"testingUPDATED@labsquare.org"}
	# 	headers = {'content-type': 'application/json'}

	# 	data =requests.put(UserTest.url + "users/" + user_id, 
	# 						 data = json.dumps(payload),
	# 						 headers = headers).text

	# 	array = json.loads(data)

	# 	self.assertIn("success",array)
	# 	self.assertTrue(array["success"], "success equal false")
	# 	updatedUser = User.objects.get(pk=user_id)
	# 	self.assertEqual(payload["email"], updatedUser.email)

		


