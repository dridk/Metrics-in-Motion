from flask import Blueprint 

resource = Blueprint("view_api", __name__)

@resource.route("/views")
def users():
	return "list of view"