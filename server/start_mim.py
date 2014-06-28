#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask 
from pymongo import MongoClient
from api import users, views
import yaml 


print("start metrics in motion")

# open and read cfg file 
with open("config.yaml","r") as f:
	cfg = yaml.load(f)

# init flask
app     = Flask("mim")

# init mongodb
client  = MongoClient(host = cfg["mongodb"]["host"],
	                  port = cfg["mongodb"]["port"])

db      = client[cfg["mongodb"]["db"]]
# init mim database 

# register api 
app.register_blueprint(users.resource, url_prefix = "/"+cfg["api"]["prefix"])
app.register_blueprint(views.resource, url_prefix = "/"+cfg["api"]["prefix"])

# update flask cfg 
app.config.update(cfg["flask"])

# start flask

# Update flask cfg 
# small tricks... Flask need uppercase keys 
flask_cfg = dict((k.upper(), v) for k, v in cfg["flask"].iteritems())

app.config.update(
    flask_cfg
)


# Run Flask App
app.run()