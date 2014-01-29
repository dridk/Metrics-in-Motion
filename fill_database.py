from mim.models import *

data = [
"Medical View","AirCraft View",
"Kitchen View",
"Bakers View",
"Dev View",
"Animal View",
"Home View",
"Cars View",
"Horse View",
"Clothers View",
"Apple View",
"Microsoft View",
"Test View"]

for title in data:
	view = View();
	view.title = title
	view.description = "This is a " + title
	view.style = "default"
	view.user_id = 1
	view.save()





