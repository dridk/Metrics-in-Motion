#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
from flask.ext.testing import LiveServerTestCase
import unittest
from flask.ext.testing import TestCase 

class UserTest(unittest.TestCase):
	def create_app(self):
		app = Flask(__name__)
		app.config["TESTING"] = True
		return app

	


unittest.main()