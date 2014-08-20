
from flask import *
from mim.models import *
from mim.ext import *

widget_api = Blueprint("widget_api", __name__)

""" Get Users Collections 
"""
@widget_api.route("/widgets", methods = ["GET"])
def test():
	return "salut"
