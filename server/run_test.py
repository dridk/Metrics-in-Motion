import unittest
import requests 
import json 
from test.user_test import *
from test.dashview_test import *




if __name__ == '__main__':
	testSuite4User = unittest.TestLoader().loadTestsFromTestCase(UserTest)
	unittest.TextTestRunner(verbosity=2).run(testSuite4User)
	
	testSuite4Dashview = unittest.TestLoader().loadTestsFromTestCase(DashViewTest)
	unittest.TextTestRunner(verbosity=2).run(testSuite4Dashview)

