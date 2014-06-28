# -*- coding: utf-8 -*-

from flask import * 
from common import *

resource = Blueprint("user_api", __name__)


@resource.route("/users")
def users():
	data = current_app.db.users.find({}, {"_id":False})
	return ErrorResponse("marche pas", "cannot_read")