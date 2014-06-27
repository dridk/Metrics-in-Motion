#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask 
from pymongo import MongoClient
from api import users, views
import yaml 


print("start metrics in motion")

# open and read config file 
with open("config.yaml","r") as f:
	config = yaml.load(f)

# init flask
app     = Flask("mim")

# init mongodb
client  = MongoClient(host = config["mongodb"]["host"],
	                  port = config["mongodb"]["port"])

db      = client[config["mongodb"]["db"]]
# init mim database 


# register api 
app.register_blueprint(users.resource, url_prefix = "/api")
app.register_blueprint(views.resource, url_prefix = "/api")

# update flask config 
app.config.update(config["flask"])

# start flask

# Update flask config 
# small tricks... Flask need uppercase keys 
flask_config = dict((k.upper(), v) for k, v in config["flask"].iteritems())

app.config.update(
    flask_config
)


# Run Flask App
app.run()