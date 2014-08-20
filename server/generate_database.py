from mim import * 
from loremipsum import *
import random
import json
import time 

start_time = time.clock()
# Generate fake user 
print "Creation of User collections ..."
User.drop_collection()
User(email="olivier@labsquare.org", nickname="ikit", password="ikit").save()
User(email="eugene@labsquare.org", nickname="it-s", password="it-s").save()
User(email="sacha@labsquare.org", nickname="ikit", password="ikit").save()


# # Generate fake view
DashView.drop_collection() 
print "Creation of Dashviews collections ..."

for i in range(2):
	view = DashView()
	view.owner       = User.objects.first()
	view.title       = get_sentence()[:10]
	view.description = get_sentence()

	for j in range(4):
		widget = Widget()
		widget.title = get_sentence()[:10]
		widget.description = get_sentence()
		view.widgets.append(widget)

		if j==0:
			widget.datas["Firefox"] = [None, None, 0, 16.6,   25,   31, 36.4, 45.5, 46.3, 42.8, 37.1]
			widget.datas["IE"] =  [85.8, 84.6, 84.7, 74.5,   66, 58.6, 54.7, 44.8, 36.2, 26.6, 20.1]




		for c in range(10):
			comment = Comment()
			comment.owner = User.objects[random.randint(0, User.objects.count()-1)]
			comment.comment = get_sentence()
			widget.comments.append(comment)

	view.save()
	

print "Finish in {} seconds".format(time.clock() - start_time)







