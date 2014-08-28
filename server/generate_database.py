from mim import * 
from loremipsum import *
import random
import json
import time 

start_time = time.clock()
# Generate fake user 
print "Creation of User collections ..."
User.drop_collection()
User(email="olivier@labsquare.org", username="ikit", password="ikit").save()
User(email="eugene@labsquare.org", username="it-s", password="it-s").save()
User(email="sacha@labsquare.org", username="ikit", password="ikit").save()


# # Generate fake view
DashView.drop_collection() 
Widget.drop_collection() 
print "Creation of Dashviews collections ..."

for i in range(2):
	view = DashView()
	view.owner       = User.objects.first()
	view.title       = get_sentence()[:10]
	view.description = get_sentence()
	view.save()

	for j in range(4):
		widget = Widget()
		widget.title = get_sentence()[:10]
		widget.description = get_sentence()
		widget.dashview = view
		widget.chart = "Line"
		widget.config["animation"] = False
		widget.config["showScale"] = False
		widget.datas = Datas()
		widget.datas.labels = ["January", "February", "March", "April", "May", "June", "July"]
		widget.datas.datasets = []
		widget.datas.datasets.append(
			{
			"label": "My First dataset",
			"fillColor": "rgba(220,220,220,0.2)",
			"strokeColor": "rgba(220,220,220,1)",
			"pointColor": "rgba(220,220,220,1)",
			"pointStrokeColor": "#fff",
			"pointHighlightFill": "#fff",
			"pointHighlightStroke": "rgba(220,220,220,1)",
			"data": [65, 59, 80, 81, 56, 55, 40]
			})




		for c in range(10):
			comment = Comment()
			comment.owner = User.objects[random.randint(0, User.objects.count()-1)]
			comment.comment = get_sentence()
			widget.comments.append(comment)

			widget.save()





print "Finish in {} seconds".format(time.clock() - start_time)







