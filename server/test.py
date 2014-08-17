import unittest
import requests 
import json 

# Check assert list from https://docs.python.org/3/library/unittest.html

URL = "http://localhost:5000/api/"
class UserTest(unittest.TestCase):

	def setUp(self):
		self.url = URL

	def test_get_user_list(self):
		data = requests.get(self.url + "users").text 
		array = json.loads(data)
		self.assertIn("results",array)
		for user in array["results"]:
			self.assertIn("id",user)
			self.assertIn("email",user)
			self.assertIn("nickname",user)
			self.assertIn("password",user)



if __name__ == '__main__':
	unittest.main()
