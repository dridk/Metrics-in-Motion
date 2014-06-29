#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask , g
from pymongo import MongoClient
from api import users, views
import yaml 


print("start metrics in motion")

# open and read cfg file 
with open("config.yaml","r") as f:
	cfg = yaml.load(f)

# init flask
app     = Flask(__name__)

# init mongodb
client  = MongoClient(host = cfg["mongodb"]["host"],
	                  port = cfg["mongodb"]["port"])

app.db  = client[cfg["mongodb"]["db"]]
# init mim database 


# register api 
app.register_blueprint(users.resource, url_prefix = "/"+cfg["api"]["prefix"], test ="this is a test")
app.register_blueprint(views.resource, url_prefix = "/"+cfg["api"]["prefix"], test ="this is a test")

# update flask cfg 
app.config.update(cfg["flask"])

# start flask

# Update flask cfg 
# small tricks... Flask need uppercase keys 
flask_cfg = dict((k.upper(), v) for k, v in cfg["flask"].iteritems())

app.config.update(
    flask_cfg
)


# ADDED BY IKIT
# Run Flask App
app.run()