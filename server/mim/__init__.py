from flask import Flask
from flask import render_template
from flask.ext.restful import Resource, Api
import mongoengine as mongo
from models import *

from api.user_api import *
from api.dashview_api import * 
from api.widget_api import *


app = Flask(__name__)

api = Api(app, prefix="/api", catch_all_404s=True)


#load configuration from config.py 
app.config.from_pyfile("config.py")
mongo.connect(app.config["DATABASE"])



api.add_resource(UserListAPI,'/users')
api.add_resource(UserAPI,'/users/<string:user_id>', "/users")
api.add_resource(DashviewListAPI,"/dashviews")
api.add_resource(DashviewAPI,'/dashviews/<string:dashview_id>', "/dashviews")


app.add_url_rule('/api/users/login', 'login', login, methods=['POST'])
app.add_url_rule('/api/users/logout', 'logout', logout,methods=['GET'])



# api.url_map.add(Rule("/users/login", endpoint="login"))

# app.register_blueprint(user_api,url_prefix="/api")
# app.register_blueprint(dashview_api,url_prefix="/api")
# app.register_blueprint(widget_api,url_prefix="/api")



@app.route("/")
def index():
	print("salut")
	return render_template("index.html")

@app.errorhandler(404)
def page_not_found(e):
    return flask.jsonify(error=404, text=e), 404

