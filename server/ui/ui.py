# -*- coding: utf-8 -*-

from flask import * 
resource = Blueprint("ui", __name__,template_folder='templates')

"""Home Page
"""
@resource.route("/", methods=["GET"])
def home():
	return render_template("home.jade", name="test")
