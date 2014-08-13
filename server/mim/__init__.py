from flask import Flask
from flask import render_template
import mongoengine as mongo
from models import *

from api.user_api import *
from api.dashview_api import * 


app = Flask(__name__)



#load configuration from config.py 
app.config.from_pyfile("config.py")
mongo.connect(app.config["DATABASE"])



app.register_blueprint(user_api,url_prefix="/api")
app.register_blueprint(dashview_api,url_prefix="/api")



@app.route("/")
def index():
	print("salut")
	return render_template("index.html")

@app.errorhandler(404)
def page_not_found(e):
    return flask.jsonify(error=404, text=e), 404

