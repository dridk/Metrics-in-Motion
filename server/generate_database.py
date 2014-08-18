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

		vegaJson='{"width":400,"height":200,"padding":{"top":10,"left":30,"bottom":20,"right":10},"data":[{"name":"table","values":[{"x":"A","y":28},{"x":"B","y":55},{"x":"C","y":43},{"x":"D","y":91},{"x":"E","y":81},{"x":"F","y":53},{"x":"G","y":19},{"x":"H","y":87},{"x":"I","y":52}]}],"scales":[{"name":"x","type":"ordinal","range":"width","domain":{"data":"table","field":"data.x"}},{"name":"y","range":"height","nice":true,"domain":{"data":"table","field":"data.y"}}],"axes":[{"type":"x","scale":"x"},{"type":"y","scale":"y"}],"marks":[{"type":"rect","from":{"data":"table"},"properties":{"enter":{"x":{"scale":"x","field":"data.x"},"width":{"scale":"x","band":true,"offset":-1},"y":{"scale":"y","field":"data.y"},"y2":{"scale":"y","value":0}},"update":{"fill":{"value":"steelblue"}},"hover":{"fill":{"value":"red"}}}}]}';
		widget.vega = Vega.from_json(vegaJson)
		view.widgets.append(widget)

		for c in range(10):
			comment = Comment()
			comment.owner = User.objects[random.randint(0, User.objects.count()-1)]
			comment.comment = get_sentence()
			widget.comments.append(comment)

	view.save()
	

print "Finish in {} seconds".format(time.clock() - start_time)







