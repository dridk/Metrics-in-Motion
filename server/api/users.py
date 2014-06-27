from flask import Blueprint 

resource = Blueprint("user_api", __name__)

@resource.route("/users")
def users():
	return "list of users"