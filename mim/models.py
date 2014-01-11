from django.db import models
from django.contrib.auth.models import User




class View(models.Model):
	title = models.CharField(max_length=64, default="No Title")
	description = models.CharField(max_length=256, default="No Description")
	style = models.CharField(max_length=32, default="default")
	user = models.ForeignKey(User, related_name="views")

	def __unicode__(self):
		return self.title


class Widget(models.Model):
	title = models.CharField(max_length=64, default="No Title")
	description = models.CharField(max_length=256, default="No Description")
	row = models.IntegerField(default=0)
	col = models.IntegerField(default=0)
	width = models.IntegerField(default=380)
	height = models.IntegerField(default=300)
	spec = models.TextField()
	view = models.ForeignKey(View, related_name="widgets")

	def __unicode__(self):
		return self.title

